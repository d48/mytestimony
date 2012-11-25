/**
 * Route object passed to app  
 */
var request = require('request');

module.exports = {
  /**
   * Home page 
   */
  index: function(req,res) {
    var host    = req.headers.host
      , url     = 'http://' + host + '/api/v1/testimonies'
      , options = {url: url, json: true}
    ;

    // ajax request to get testimonies
    request.get(options, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        res.render('index', {title: 'MyTestimony.com', page: 'home', testimonies: body});
      }
    });
  }

  , about: function(req,res) {
    res.render('about', {title: 'MyTestimony.com - About', page: 'about'})
  }

  , contact: function(req,res) {
    res.render('contact', {title: 'MyTestimony.com - Contact', page: 'contact'})
  }
}; 
