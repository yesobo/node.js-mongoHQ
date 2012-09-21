mongodb = require 'mongodb'
url = require 	'url'
log = console.log

connectionUri = url.parse process.env.MONGO_DES_PAT
dbName = connectionUri.pathname.replace /^\//, ''

mongodb.Db.connect process.env.MONGO_DES_PAT, (error, client)->
		throw error if error

		client.collectionNames (error, names) ->
			# output all collection names
			log "Collections"
			log "==========="
			lastCollection = null
			for colData in names
				colName = colData.name.replace(dbName + ".", '')
				log colName
				lastCollection = colName

			collection = new mongodb.Collection client, lastCollection
			log("\nDocuments in " + lastCollection)
			documents = collection.find {}, limit:5

			# output a count of all documents found
			documents.count (error, count) ->
				log "#{count} document(s) found"
				log "================================="

				# output the first 5 documents
				documents.toArray (error, docs) ->
					throw error if error

					for doc in docs then log doc
		
					client.close() 

