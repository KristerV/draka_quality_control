Products = new Mongo.Collection('products')

Meteor.startup(function(){
	if (Meteor.isServer) {
		Meteor.publish('products', function(){
			return Products.find()
		})
	}
})