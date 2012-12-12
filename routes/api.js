var tm = require('./../models/testimony.js')

module.exports = {
  testimonies: function(req, res) {
    // get all testimonies
    tm.findAll('testimonies', function(error, testimonies) {
      res.json(testimonies);
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
 
}
