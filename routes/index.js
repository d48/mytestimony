
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', 
      { 
          title: 'MyTestimony.com' 
          , page: 'home'
      }
  )
};

exports.about = function(req, res){
  res.render('about', 
      { 
          title: 'MyTestimony.com - About' 
          , page: 'about'
      }
  )
};

exports.contact = function(req, res){
  res.render('about', { title: 'MyTestimony.com - Contact' })
};
