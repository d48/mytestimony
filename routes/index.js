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
      , url2    = 'http://' + host + '/api/v1/tags'
      , options = {url: url, json: true}
      , options2 = {url: url2, json: true}
      , tags = []
      ;

    tags = ['God','Holy Spirit','Jesus','Texas','job','accident','blue'];


    // custom sort ignoring case
    tags.sort(function(a,b) {
      if(a.toLowerCase() < b.toLowerCase())
        return -1
      if(a.toLowerCase() > b.toLowerCase())
        return 1
      return 0;
    });

    // ajax request to get tags
    // @todo: instead of having route do ajax request, let's just render template
    //        and have client do mulitple ajax requests and do dom updating
    request.get(options2, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var tags = body;

        // ajax request to get testimonies
        request.get(options, function(error, response, body) {
          if (!error && response.statusCode === 200) {
            res.locals.tags = tags;
            res.render('index', {title: 'MyTestimony.com', page: 'home', testimonies: body});
          }
        });
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
