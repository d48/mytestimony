var dbstr = process.env.MONGOHQ_URL || 'mongodb://localhost/mytestimony';

var connect = require('connect')
  , mongo = require('mongodb')
  , database = null
  ;

// init to connect to db
TestimonyModel = function() {
  mongo.connect(dbstr, {}, function(err, db) {
    console.log("connected, db: " + db);

    database = db;

    database.addListener("error", function(err) {
      console.log("Error connecting to database");
    });
  })
};

/**
 * return collection from mongodb 
 */
TestimonyModel.prototype.getCollection = function(cb) {
  // 'testimonies' is the name of the collection from the database
  database.collection('testimonies', function(err, testim_collection) {
    if (err) cb(err);
    else cb(null, testim_collection);
  });
};

/**
 * return all documents from mongodb 
 */
TestimonyModel.prototype.findAll = function(cb) {
  this.getCollection(function(err, testim_collection) {
    if (err) cb(err);
    else {
      testim_collection.find().toArray(function(err, results) {
        if (err) cb(err);
        else cb(null, results);
      });
    }
  });
};

exports.TestimonyModel = TestimonyModel;
