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
		});
	}
})