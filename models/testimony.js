// Connect to db
  var mongo = require('mongodb')
  , DB_NAME = 'mytestimony'
  , Server  = mongo.Server
  , Db      = mongo.Db
  , BSON    = mongo.BSONPure
  , server  = new Server('localhost', 27017, {auto_reconnect: true})
  , db      = new Db(DB_NAME, server, {safe: true})
  ;

// open up connection
db.open(function(err, db) {
    if(!err) { console.log("Connected to "+ DB_NAME + " database"); }
});


/**
 * return collection from mongodb 
 * @todo: abstract into db methods so can reuse
 */
exports.getCollection = function(collName, cb) {
  // 'testimonies' is the name of the collection from the database
  db.collection(collName, function(err, results) {
    if (err) cb(err);
    else cb(null, results);
  });
};

/**
 * return all documents from mongodb 
 * @todo: abstract into db methods so can reuse
 */
exports.findAll = function(collName, cb) {
  this.getCollection(collName, function(err, collection) {
    if (err) cb(err);
    else {
      collection.find().toArray(function(err, results) {
        if (err) cb(err);
        else cb(null, results);
      });
    }
  });
};

/**
 * Gets array of all distinct keys within collection 
 */
exports.getDistinct = function(collName, key, cb) {
  this.getCollection(collName, function(err, coll) {
    if (err) cb(err);
    else {
      coll.distinct(key, function(err, results) {
        if (err) cb(err);
        else cb(null, results);
      });
    }
  });  
};
