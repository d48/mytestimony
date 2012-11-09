/**
 * Route object passed to app  
 */
module.exports = {
    index: function(req,res) {
        res.render('index', {title: 'MyTestimony.com', page: 'home'})
    }
    , about: function(req,res) {
        res.render('about', {title: 'MyTestimony.com - About', page: 'about'})
    }
     , contact: function(req,res) {
        res.render('contact', {title: 'MyTestimony.com - Contact', page: 'contact'})
    }

}; 

