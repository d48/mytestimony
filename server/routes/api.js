var tm = require('./../models/testimony.js')
var bleach = require('bleach');

module.exports = {
  testimonies: function(req, res) {
    // get all testimonies
    tm.findAll('testimonies', function(error, testimonies) {
      res.json(testimonies);
    });
  }

  , testimoniesAdd: function(req, res) {
     console.log('req via api', req.body);


     var whiteList = [
         'b'
         , 'i'
         , 'u'
         , 'ul'
         , 'ol'
         , 'li'
         , 'div'
     ];

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


      console.log('this is sanitized',  obj);


     // run through sanitizer, if anything thing required returns falsy,
     // kick out error

     // @todo add error handling for xhr requests

     tm.insert('testimonies', obj, function(error, response) {
        res.json(response);
     }); 
  }

  , testimoniesId: function(req, res) {
    var id = req.params.id;
    // get all testimonies
    tm.findOne('testimonies', id, function(error, testimony) {
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
      tm.find('testimonies', req.params.tag, function(error, testimonies) {
          res.json(testimonies);
      });
  }
}
