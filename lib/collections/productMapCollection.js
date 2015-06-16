ProductMapCollection = new Mongo.Collection('productMap')

ProductMapCollection.allow({
	insert: function (userId, doc) {
		return true
	},
	update: function (userId, doc, fields, modifier) {
		return true
	},
	remove: function (userId, doc) {
		return false
	},
});

Meteor.startup(function(){
	if (Meteor.isServer) {
		Meteor.publish('productMap', function(){
			return ProductMapCollection.find()
		})
	}
})
/*
ProductMapCollection.insert({code: "tootekood1", description: "kirjeldus 1"})
ProductMapCollection.insert({code: "tootekood2", description: "kirjeldus 2"})
ProductMapCollection.insert({code: "tootekood3", description: "kirjeldus 3"})
ProductMapCollection.insert({code: "tootekood4", description: "kirjeldus 4"})
ProductMapCollection.insert({code: "tootekood5", description: "kirjeldus 5"})
ProductMapCollection.insert({code: "tootekood6", description: "kirjeldus 6"})
ProductMapCollection.insert({code: "tootekood7", description: "kirjeldus 7"})
*/