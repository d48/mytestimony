
/**
 * Module dependencies.
 */

var express   = require('express')
  , http      = require('http')
  , routes    = require('./routes')
  , routesapi = require('./routes/api')
  ;

var app = express();
var server = http.createServer(app);

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', {layout: false});
  app.locals.pretty = true;
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
app.get('/', routes.index);
app.get('/about', routes.about);
app.get('/contact', routes.contact);

// API routes
// @todo: have client use instead of application
app.get('/api/v1/testimonies', routesapi.testimonies);
app.get('/api/v1/tags', routesapi.tags);

server.listen(3000);
console.log("Express server listening on port %d in %s mode", server.address().port, app.settings.env);
