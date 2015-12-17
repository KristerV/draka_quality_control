KSMCollection = new Mongo.Collection('ksm')

KSMCollection.allow({
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
		Meteor.publish('ksm', function(){
			return KSMCollection.find()
		})
	}
})
