var tm = require('./../models/testimony.js')
var bleach = require('bleach');
var emailer = require('./../js/utils/emailer.js')

function handleError(msg) {
  console.log('Error: ' + msg);
}

module.exports = {
  testimonies: function(req, res) {
    // get all testimonies where publish is true
    tm.find('testimonies', { publish: true }, function(error, testimonies) {
      res.json(testimonies);
    });
  }

  , sendEmail: function() {

  }

  , sanitizeList: function() {

  }

  , testimoniesAdd: function(req, res) {
     var body = req.body;
     var whiteList = ['b', 'i', 'u', 'ul', 'ol', 'li', 'div'];
     var opts = {
         mode: 'white'
         , list: whiteList
     };


     var email = bleach.sanitize(req.body.email);
     var nameClean = bleach.sanitize(req.body.name);
     var html = bleach.sanitize(req.body.testimony, opts);
     var title = bleach.sanitize(req.body.title);
     var testimony = bleach.sanitize(req.body.testimony);



     // @todo `publish` key will be set false initially once email smtp and edit hash algorithm set up. 
     // @todo Opt-in from email will set flag to true, only `publish: true` documents will be viewable
     var obj = {
       email: email, 
       testimony: html, 
       name: nameClean ? nameClean : 'Anonymous', 
       publish: false,
       title: title
      };


     // run through sanitizer, if anything thing required returns falsy,
     // kick out error

     // @todo add error handling for xhr requests

     tm.insert('testimonies', obj, function(error, response) {
       if (error) {
         handleError(error);
       }
       // send email 
       var emailOpts = {
          emailTo: email
       };

       // send to admin to approve
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
