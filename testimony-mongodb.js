var localstr = 'mongodb://localhost/node-mongo-blog';

var connect = require('connect')
  , mongo = require('mongodb')
  , database = null
  ;

TestimonyModel = function() {
  mongo.connect(localstr, {}, function(err, db) {
    console.log("connected, db: " + db);

    database = db;

    database.addListener("error", function(err) {
      console.log("Error connecting to MongoHQ");
    });
  })
};

exports.TestimonyModel = TestimonyModel;
