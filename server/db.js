var mongo = require('mongodb')

var db = null


module.exports = {
	collection: function(name) {
		return db.collection(name)
	},
	init: function(cb) {
		if (db == null) {
			mongo.MongoClient.connect('mongodb://localhost:27017/cs360survey', function(err, newDB) {
				db = newDB
				db.id = mongo.ObjectID
				cb(err)
			})
		}
	}
}