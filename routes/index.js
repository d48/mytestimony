/**
 * Route object passed to app  
 */
var request = require('request')
  , appHelper = require('./../app/utils/helpers.js');

module.exports = {
  // home page
  index: function(req,res) {
    var host   = req.headers.host
    , url      = 'http://' + host + '/api/v1/testimonies'
    , url2     = 'http://' + host + '/api/v1/tags'
    , options  = {url: url, json: true}
    , options2 = {url: url2, json: true}
    , tags     = [];

    // ajax request to get tags
    // @todo: instead of having route do ajax request, let's just render template
    //        and have client do mulitple ajax requests and do dom updating
    request.get(options2, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var tags = body.sort(appHelper.compare);

        // ajax request to get testimonies
        request.get(options, function(error, response, body) {
          if (!error && response.statusCode === 200) {
            console.log(body);
            res.locals.tags = tags;
            res.render('index', {
              title: 'MyTestimony.com', page: 'home', testimonies: body
            });
          }
        });
      }
    });
  }

  , about: function(req,res) {
      res.render('about', {
        title: 'MyTestimony.com - About', page: 'about'
      });
  }

  , contact: function(req,res) {
      res.render('contact', {
        title: 'MyTestimony.com - Contact', page: 'contact'
      });
  }

  , testimonies: function(req, res) {
    var id    = req.params.id
    , host    = req.headers.host
    , url     = 'http://' + host + '/api/v1/testimonies/' + id
    , options = {url: url, json: true};

    request.get(options, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        res.render('testimonies', {
          title: 'MyTestimony.com - Testimony', page: 'testimony', testimony: body
        });
      }
    });

  }
}; 
