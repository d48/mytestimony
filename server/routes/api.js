var tm = require('./../models/testimony.js')
var bleach = require('bleach');
var emailer = require('./../utils/emailer.js')
var host = process.env.NODE_ENV !== 'production' ? 'localhost:4000' : 'mytestimony.herokuapp.com'
var emailAdmin = process.env.MYTESTIMONYAPP_ADMIN_EMAIL;

console.log('environment', process.env.NODE_ENV);

function handleError(msg) {
  console.log('Error: ' + msg);
}


function _prepareHTMLText(testimony) {
  var message = ''
    , br = '<br />'
  ;

  message += br;
  message += 'Email: ' + testimony.email + br;
  message += 'Testimony: ' + testimony.testimony + br;
  message += 'Name: ' + testimony.name + br;
  message += 'Title: ' + testimony.title + br;
  message += 'Date: ' + testimony.date.toString() + br;
  message += 'Okay to publish? http://' + host + '/testimonies/publish/' + testimony._id + br;

  return message;
}

function _sanitizeForm(body) {
    var whiteList = ['b', 'i', 'u', 'ul', 'ol', 'li', 'div'];
    var opts = {
        mode: 'white'
            , list: whiteList
    };


    var email = bleach.sanitize(body.email);
    var nameClean = bleach.sanitize(body.name);
    var html = bleach.sanitize(body.testimony, opts);
    var title = bleach.sanitize(body.title);
    var testimony = bleach.sanitize(body.testimony);



    // @todo `publish` key will be set false initially once email smtp and edit hash algorithm set up. 
    // @todo Opt-in from email will set flag to true, only `publish: true` documents will be viewable
    var obj = {
        email: email, 
        testimony: html, 
        name: nameClean ? nameClean : 'Anonymous', 
        publish: false,
        title: title
    };

    return obj;
}

module.exports = {
  testimonies: function(req, res) {
    // get all testimonies where publish is true
    tm.find('testimonies', { publish: true }, function(error, testimonies) {
      res.json(testimonies);
    });
  }

  , testimoniesAdd: function(req, res) {
     var obj = _sanitizeForm(req.body);

     // run through sanitizer, if anything thing required returns falsy,
     // kick out error

     // @todo add error handling for xhr requests

     tm.insert('testimonies', obj, function(error, response) {
       if (error) {
         handleError(error);
         return;
       }
       // send email 
       var emailOpts = {
         subject: 'MyTestimony App - admin approval needed, new testimony',
         to: emailAdmin,
         html: 'A new testimony has been posted, please review and publish if approved.'
       };

       emailOpts.html += _prepareHTMLText(response.ops[0]);

       // sending to admin to approve
       emailer.sendMail(emailOpts, function(err, info) {
         if (err) {
           // should update client if error
           handleError(err);            
         }

         console.log('sendMail success: ' + info);
       });

       // update client
       // @todo if error in sending email, should trigger update in client
       // to notify of an issue. Need to flag admin as well (this should be 
       // handled via some general logging system)
       res.json(response);
     }); 

  }

  , testimoniesEdit: function(req, res) {
    // get one testimony
    tm.findOne('testimonies', { editId: req.params.id }, function(error, testimony) {
      if (error) {
        console.log('error retreiving edit', error);
      } else {
        console.log('testimony', testimony);
      }
      res.json(testimony);
    });
  }

  , testimoniesEditPost: function(req, res) {
     var obj = _sanitizeForm(req.body)
         , id = req.body.id
        , update = {
         $set : obj
     };

     // run through sanitizer, if anything thing required returns falsy,
     // kick out error

     // @todo add error handling for xhr requests

     tm.findOneAndUpdate('testimonies', { editId: id }, update, function(error, response) {
       if (error) {
         console.log('error in updating testimonies', error);
         handleError(error);
         return;
       }
       // send email 
       var emailOpts = {
         subject: 'MyTestimony App - admin approval needed, updated testimony',
         to: emailAdmin,
         html: 'An updated testimony has been posted, please review and publish if approved.'
       };

       emailOpts.html += _prepareHTMLText(response.value);

       // sending to admin to approve
       emailer.sendMail(emailOpts, function(err, info) {
         if (err) {
           // should update client if error
           handleError(err);            
         }

         console.log('sendMail success: ' + info);
       });

       // update client
       // @todo if error in sending email, should trigger update in client
       // to notify of an issue. Need to flag admin as well (this should be 
       // handled via some general logging system)
       res.json(response);
     }); 
  }



  , testimoniesId: function(req, res) {
    // get one testimony
    tm.findOne('testimonies', { shortId: req.params.id }, function(error, testimony) {
      res.json(testimony);
    });
  }

  , tags: function(req, res) {
    // get all unique tags from all documents
    tm.getDistinct('testimonies', 'tags', function(error, tags) {
      res.json(tags);
    });
  }

  , testimoniesFromTag: function(req, res) {
      // set as array in case want to filter based on multiple
      var condition = {
          tags: {
              $all: [req.params.tag]
          }
      };
 

      tm.find('testimonies', condition, function(error, testimonies) {
          res.json(testimonies);
      });
  }
}
