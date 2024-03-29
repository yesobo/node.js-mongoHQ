// Generated by CoffeeScript 1.3.3
(function() {
  var connectionUri, dbName, log, mongodb, url;

  mongodb = require('mongodb');

  url = require('url');

  log = console.log;

  connectionUri = url.parse(process.env.MONGO_DES_PAT);

  dbName = connectionUri.pathname.replace(/^\//, '');

  mongodb.Db.connect(process.env.MONGO_DES_PAT, function(error, client) {
    if (error) {
      throw error;
    }
    return client.collectionNames(function(error, names) {
      var colData, colName, collection, documents, lastCollection, _i, _len;
      log("Collections");
      log("===========");
      lastCollection = null;
      for (_i = 0, _len = names.length; _i < _len; _i++) {
        colData = names[_i];
        colName = colData.name.replace(dbName + ".", '');
        log(colName);
        lastCollection = colName;
      }
      collection = new mongodb.Collection(client, lastCollection);
      log("\nDocuments in " + lastCollection);
      documents = collection.find({}, {
        limit: 5
      });
      return documents.count(function(error, count) {
        log("" + count + " document(s) found");
        log("=================================");
        return documents.toArray(function(error, docs) {
          var doc, _j, _len1;
          if (error) {
            throw error;
          }
          for (_j = 0, _len1 = docs.length; _j < _len1; _j++) {
            doc = docs[_j];
            log(doc);
          }
          return client.close();
        });
      });
    });
  });

}).call(this);
