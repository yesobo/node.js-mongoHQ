// npm install mongodb
var mongodb = require('mongodb');
var url = require('url');
var log = console.log;

// We are assuming the connection string is set in an environment variable.
var connectionUri = url.parse(process.env.MONGO_DES_PAT);

var dbName = connectionUri.pathname.replace(/^\//, '');

mongodb.Db.connect(process.env.MONGO_DES_PAT, function(error, client) {
  if (error) throw error;

  client.collectionNames(function(error, names){
    if(error) throw error;

    // output all collection names
    log("Collections");
    log("===========");
    var lastCollection = null;
    names.forEach(function(colData){
      var colName = colData.name.replace(dbName + ".", '');
      log(colName);
      lastCollection = colName;
    });

    var collection = new mongodb.Collection(client, lastCollection);
    log("\nDocuments in " + lastCollection);
    var documents = collection.find({}, {limit:5});

    // output a count of all documents found
    documents.count(function(error, count){
      log("  " + count + " documents(s) found");
      log("====================");

      // output the first 5 documents
      documents.toArray(function(error, docs) {
        if(error) throw error;

        docs.forEach(function(doc){
          log(doc);
        });
      
        // close the connection
        client.close();
      });
    });
  });
});