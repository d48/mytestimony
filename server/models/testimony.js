// Connect to db
  var mongo   = require('mongodb')
  , mongoUri  = require('mongodb-uri')
  , uriString = process.env.MONGOLAB_URI
  , DB_NAME   = 'mytestimony'
  , Server    = mongo.Server
  , Db        = mongo.Db
  , BSON      = mongo.BSONPure
  , ObjectID  = mongo.ObjectID
  , shortId   = require('short-mongo-id')
  , strCheck  = 'mongolab.com:'
  , dbOpts    = {
    auto_reconnect : true
  }
  , obj
  , host
  , hostMongoLab
  , server   
  , db      
  , bIsMongoLabs = false;
  ;

  if (typeof uriString !== 'undefined') {
    bIsMongoLabs = true;
    obj = mongoUri.parse(uriString); 
    hostMongoLab = obj.hosts[0];
    host = obj.scheme 
      + '://' + obj.username 
      + ':' + obj.password 
      + '@' + hostMongoLab.host
      + ':' + hostMongoLab.port
      ;

    DB_NAME = obj.database;



  } else {
    server = new Server('localhost', 27017, dbOpts);
    db = new Db(DB_NAME, server, {safe: true});

    db.open(function(err, db) {
        if(!err) { 
          db = db;
        }
    });
  }

module.exports = {

  /**
   * return collection from mongodb 
   * @todo: abstract into db methods so can reuse
   */
  getCollection: function(collName, cb) {

     if (!db && bIsMongoLabs) {

       mongo.MongoClient.connect(uriString, function(err, db) {
         db = db;

         if (!err) {
           db.collection(collName, function(err, results) {
            if (err) cb(err);
            else cb(null, results);
          });
         } else {
           cb(err);
         }
       });  
     } else {
        // 'testimonies' is the name of the collection from the database
        db.collection(collName, function(err, results) {
          if (err) cb(err);
          else cb(null, results);
        });
     }
  }

   /**
    * Gets array of all distinct keys within collection 
    */
  , getDistinct: function(collName, key, cb) {
    this.getCollection(collName, function(err, coll) {
      if (err) cb(err);
      else {
        coll.distinct(key, function(err, results) {
          if (err) cb(err);
          else cb(null, results);
        });
      }
    });  
  }

    /**
     * Returns collection based on find condition
     * 
     * @name find
     * @param {string} collName - collection name
     * @param {string} tag - tag passed from route
     * @param {function} cb -  callback to execute on success
     * @returns {object} - JSON object
     * @method 
     * @author Ryan Regalado 
     */
  , find: function(collName, condition, cb) {
      this.getCollection(collName, function(err, collection) {
          if (err) {
            cb(err);
          } else {
              collection.find(condition).sort({ date: -1 }).toArray(function(err, results) {
                  if (err) cb(err);
                  else cb(null, results);
              });
          }
      });
  }

  /**
   * return all documents from mongodb 
   * @todo: abstract into db methods so can reuse
   */
  , findAll: function(collName, cb) {
    this.getCollection(collName, function(err, collection) {
      if (err) cb(err);
      else {
        collection.find().sort([['date', -1]]).toArray(function(err, results) {
          if (err) cb(err);
          else cb(null, results);
        });
      }
    });
  }

    /**
     * Finds a single item in the collection based on id
     * 
     * @name findOne
     * @param {String} collName - 
     * @param {Object} obj - parameter to search by, e.g., { shortId: CWKiUkJ }
     * @param {Function} cb - callback used for error or response process 
     * @returns {Function} - callback 
     * @method 
     * @author Ryan Regalado 
     */
  , findOne: function(collName, obj, cb) {

    this.getCollection(collName, function(err, collection) {
      if (err) cb(err);
      else {
         collection.findOne(obj, function(err, results) {
           if (err) cb(err);
           else cb(null, results);
         });
      }
    });
  }

    /**
     * Inserts document into mongodb
     * 
     * @name insert
     * @param {type} collName - collection name
     * @param {Object} obj - Dcoument to insert
     * @returns void - 
     * @author Ryan Regalado 
     */
  , insert: function(collName, obj, cb) {
    this.getCollection(collName, function(err, collection) {
      if (err) {
        cb(err);
      } else {
         var objID = new ObjectID();
         obj._id = objID;
         obj.date = new Date();
         obj.shortId = shortId(objID.valueOf());
         obj.editId = obj.shortId + obj.date.getTime();

         collection.insert(obj, function(err, results) {
           if (err) cb(err);
           else cb(null, results);
         });
      }
    });
  }
  , findOneAndUpdate: function (collName, query, obj, cb) {
     this.getCollection(collName, function(err, collection) {
      if (err) {
        cb(err);
      } else {
         collection.findOneAndUpdate(query, obj, { returnOriginal: false }, function(err, results) {
             console.log('results from update', results);
           if (err) cb(err);
           else cb(null, results);
         });
      }
    });
     
  }


};



