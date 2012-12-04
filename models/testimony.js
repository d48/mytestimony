var dbstr = process.env.MONGOHQ_URL || 'mongodb://localhost/mytestimony';

var connect = require('connect')
  , mongo = require('mongodb')
  , database = null
  , testimonyCollection = 'testimonies'
  ;

// init to connect to db
TestimonyModel = function() {
  mongo.connect(dbstr, {}, function(err, db) {
    console.log("connected with" + dbstr + " , to db: " + db);

    database = db;

    database.addListener("error", function(err) {
      console.log("Error connecting to database");
    });
  })
};

/**
 * return collection from mongodb 
 * @todo: abstract into db methods so can reuse
 */
TestimonyModel.prototype.getCollection = function(collName, cb) {
  // 'testimonies' is the name of the collection from the database
  database.collection(collName, function(err, results) {
    if (err) cb(err);
    else cb(null, results);
  });
};

/**
 * return all documents from mongodb 
 * @todo: abstract into db methods so can reuse
 */
TestimonyModel.prototype.findAll = function(collName, cb) {
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
TestimonyModel.prototype.getDistinct = function(collName, key, cb) {
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

exports.TestimonyModel = TestimonyModel;
