
/**
 * Module dependencies.
 */

var express     = require('express')
    , app       = express()
    , server    = require('http').createServer(app)
    , io        = require('socket.io').listen(server)
    , routes    = require('./server/routes')
    , routesapi = require('./server/routes/api')
    , stylus    = require('stylus')
    , nib       = require('nib')
    , helpers  = require('./server/js/utils/helpers')
    , port      = 4000
    ;

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .set('compress', true)
    .use(nib());
}


app.locals.truncateWords = helpers.truncateWords;

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/server/views');
  app.set('view engine', 'jade');
  app.set('view options', {layout: false});
  app.locals.pretty = true;
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(stylus.middleware({ src: __dirname + '/client', compile: compile }));

  app.use(app.router);
  app.use(express.static(__dirname + '/client'));
});




app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
app.get('/', routes.index);
app.get('/index', routes.index);
app.get('/index/:tag', routes.index);

app.get('/about', routes.about);
app.get('/contact', routes.contact);
app.get('/testimonies/:id', routes.testimonies);
app.post('/testimonies', routes.testimoniesAdd);

// API routes
// @todo have client use instead of application.
//       But add auth
app.get('/api/v1/testimonies', routesapi.testimonies);
app.get('/api/v1/testimonies/:id', routesapi.testimoniesId);
app.get('/api/v1/tags', routesapi.tags);
app.get('/api/v1/tags/:tag', routesapi.testimoniesFromTag);
app.post('/api/v1/testimonies', routesapi.testimoniesAdd);


/* sockets */
io.sockets.on('connection', function (socket) {
  socket.emit('connect', { hello: 'world' });

  socket.on('connected', function (data) {
    console.log('client says: ' + data.status);
  });
});



server.listen(port);
console.log("Express server listening on port: ", port);
