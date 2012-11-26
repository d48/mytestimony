var TestimonyModel = require('./../models/testimony.js').TestimonyModel

// instantiate db
var tm = new TestimonyModel('localhost', 27017);

module.exports = {
  testimonies: function(req, res) {
    // get all testimonies
    tm.findAll('testimonies', function(error, testimonies) {
      res.json(testimonies);
    });
  }
  , tags: function(req, res) {
    // get all unique tags from all documents
    tm.getDistinct('testimonies', 'tags', function(error, tags) {
      res.json(tags);
    });
  }
 
}
