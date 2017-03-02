/**
 * Route object passed to app  
 */
var request = require('request')
  , appHelper = require('./../utils/helpers.js');

// url mappings
var urls = {
    tags: "/api/v1/tags/"
  , testimonies: "/api/v1/testimonies/"
};


/**
 * Returns all tags formatted alphabetically
 *
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

  /**
   * About route
   * 
   * @name about
   * @param {Object} req - Reqeust object
   * @param {Object} res - Response object
   * @returns void - Render template
   * @method 
   * @author Ryan Regalado 
   */
  about: function(req,res) {
	res.render('about', {
		title: 'MyTestimony.com'
		, page: 'about'
	});
  }




  /**
   * Home page that gets testimony data from database
   * 
   * @name index
   * @param {Object} req - Reqeust object
   * @param {Object} res - Response object
   * @returns void - Render template
   * @method 
   * @author Ryan Regalado 
   */
  , index: function(req,res) {
    var host   = req.headers.host
    , webRoot  = 'http://' + host
    , url      = webRoot + urls['testimonies']
    , options  = {url: url, json: true};

      // ajax request to get testimonies
      request.get(options, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          res.render('index', {
            title: 'MyTestimony.com'
            , page: 'home'
            , testimonies: body || []
          });
        } else { 
          console.error('There was en error', error); 
        }
      });
  }

  /**
   * Share route
   * 
   * @name share
   * @param {Object} req - Reqeust object
   * @param {Object} res - Response object
   * @returns void - Render template
   * @method 
   * @author Ryan Regalado 
   */
  , share: function(req,res) {
    res.render('share', {
      title: 'MyTestimony.com'
      , page: 'share'
    });
  }




    /**
     * Gets all testimonies and renders to page
     *
     * @name testimonies
     * @param {Object} req - Reqeust object
     * @param {Object} res - Response object
     * @returns void - Render template
     * @method 
     * @author Ryan Regalado 
     */
  , testimonies: function(req, res) {
      var id    = req.params.id
      ,   host  = req.headers.host
      , webRoot = 'http://' + host
      , url     = webRoot + urls['testimonies'] + id
      , options = {url: url, json: true}
      ;

        // on success, get testimony
        // @todo Have each partial requests it's own data? Would have to do client side
        request.get(options, function(error, response, body) {
          if (!error && response.statusCode === 200) {

              console.log('DEBUG: body', body);

            res.render('testimonies', {
              title: 'MyTestimony.com - Testimony'
              , page: 'testimony'
              , testimony: body
            });
          }
        });
  }

    /**
     * Adds tesimony to database via API
     * 
     * @name testimoniesAdd
     * @param {Object} req - Reqeust object
     * @param {Object} res - Response object
     * @returns void - Render template
     * @returns void - 
     * @method 
     * @author Ryan Regalado 
     */
  , testimoniesAdd: function(req, res) {
    var host     = req.headers.host
      , webRoot  = 'http://' + host
      , url      = webRoot + urls['testimonies']
      , formKeys = {} // object to pass post data 
      ;

    formKeys = {
      form:{
          email: req.body.email
        , name: req.body.name
        , testimony: req.body.testimonyHidden
        , title: req.body.title
      }
    };

    request.post(url, formKeys, function(error, response, body) {
      if (!error && response.statusCode === 200) {
          res.redirect('/');
      }      
    });
  }

    /**
     * Retrieves a testimony based on editId
     * 
     * @name testimoniesEdit
     * @param {Object} req - Reqeust object
     * @param {Object} res - Response object
     * @returns void - Render template
     * @returns void - 
     * @method 
     * @author Ryan Regalado 
     */
  , testimoniesEdit: function(req,res) {
    var host   = req.headers.host
    , id = req.params.id
    , webRoot  = 'http://' + host
    , url      = webRoot + urls['testimonies'] + 'edit/' + id
    , options  = {url: url, json: true};

      // ajax request to get testimonies
      request.get(options, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          res.render('edit', {
            title: 'MyTestimony.com'
            , page: 'edit'
            , testimony: body
          });
        } else { 
          console.error('There was en error', error); 
        }
      });


  }

  , testimoniesEditPost: function(req,res) {
    var host   = req.headers.host
    , id = req.params.id
    , webRoot  = 'http://' + host
    , url      = webRoot + urls['testimonies'] + 'edit/' + id
    , formKeys = {} // object to pass post data 
    ;

    formKeys = {
      form:{
          email: req.body.email
        , name: req.body.name
        , testimony: req.body.testimonyHidden
        , title: req.body.title
        , id: req.body.idHidden
      }
    };

    request.post(url, formKeys, function(error, response, body) {
        if (error) {
            console.log('error in posting edit', error);
            return;
        }

        if (!error && response.statusCode === 200) {
            res.redirect('/');
        }      
    });
  }
}; 
