/**
 * Route object passed to app  
 */
var request = require('request')
  , appHelper = require('./../app/utils/helpers.js');

// url mappings
var urls = {
    tags: "/api/v1/tags/"
  , testimonies: "/api/v1/testimonies/"
};


/**
 * Returns all tags formatted alphabetically
 *
 * @param {webRoot} url format for host
 * @param {cb} Callback function to return data to
 * @return {Array} List of tags 
 */
var getTags = function(webRoot, cb) {
  var url   = webRoot + urls['tags']
  , options = {url: url, json: true};

  request.get(options, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var tags = body.sort(appHelper.compare);
      if (cb) cb(tags);
    } else {
      throw new Error(error); 
    }
  });
};


module.exports = {
  // home page
  index: function(req,res) {
    var host   = req.headers.host
    , webRoot  = 'http://' + host
    , url      = webRoot + urls['testimonies']
    , options  = {url: url, json: true};

    // get tags
    getTags(webRoot, function(tags) {
      res.locals.tags = tags;

      // ajax request to get testimonies
      request.get(options, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          res.render('index', {
            title: 'MyTestimony.com', page: 'home', testimonies: body
          });
        }
      });
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
      var id     = req.params.id
      ,   host  = req.headers.host
      , webRoot = 'http://' + host
      , url     = webRoot + urls['testimonies'] + id
      , options = {url: url, json: true};

      // get tags
      getTags(webRoot, function(tags) {
        res.locals.tags = tags;

        // on success, get testimony
        // @todo: Have each partial requests it's own data? Would have to do client side
        request.get(options, function(error, response, body) {
          if (!error && response.statusCode === 200) {
            var testimonyTags = body.tags;
            testimonyTags = testimonyTags.sort(appHelper.compare);

            res.render('testimonies', {
              title: 'MyTestimony.com - Testimony'
              , page: 'testimony'
              , testimony: body
              , testimonyTags: testimonyTags
            });
          }
        });
      });

  }

}; 
