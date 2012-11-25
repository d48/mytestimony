var TestimonyModel = require('./../models/testimony.js').TestimonyModel

// instantiate db
var tm = new TestimonyModel('localhost', 27017);

module.exports = {
  testimonies: function(req, res) {
    // get all testimonies
    tm.findAll(function(error, testimonies) {
      res.json(testimonies);
    });
  }
}
