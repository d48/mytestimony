var tm = require('./../models/testimony.js')

function createTagsArray(string) {
    return string.replace(/\s+/g,'').split(',');
}

module.exports = {
  testimonies: function(req, res) {
    // get all testimonies
    tm.findAll('testimonies', function(error, testimonies) {
      res.json(testimonies);
    });
  }

  , testimoniesAdd: function(req, res) {
     var name = req.body.name ? req.body.name : 'Anonymous';
     console.log(req.body);
     var obj = {
          name: name
        , testimony: req.body.testimony
        , tags: createTagsArray(req.body.tags)
        , title: req.body.title
      };

     // console.log('this is obj', obj);

     // tm.insert('testimonies', obj, function(error, response) {
     //    res.json(response);
     //  }); 
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
 
}
