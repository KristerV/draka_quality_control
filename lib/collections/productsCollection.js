ProductsCollection = new Mongo.Collection('products')

ProductsCollection.allow({
	insert: function (userId, doc) {
		return true
	},
	update: function (userId, doc, fields, modifier) {
		return true
	},
	remove: function (userId, doc) {
		return true
	},
});

Meteor.startup(function(){
	if (Meteor.isServer) {
		Meteor.publish('products', function(){
			return ProductsCollection.find()
		})
	}
})

ProductsCollection.attachSchema(new SimpleSchema({
	productCode: {
		type: String,
		label: "Kood"
	},
	mapId:  {
		type: String,
		label: "Kirjeldus",
		autoform: {
			type: "select2",
			options: function() {
				return _.map(ProductMapCollection.find({},{sort: {code: 1}}).fetch(), function(obj, i) {
					return {label: obj.description, value: obj._id}
				});
			}
		}
	},
	consignment: {
		type: String,
		label: "Partii"
	},
	orderNumber: {
		type: Number,
		label: "Tootmistellimus",
		autoform: {
			type: "number"

		}
	},
	quantity: {
		type: Number,
		label: "Tootmiskogus",
		autoform: {
			type: "number"

		}
	},
	createdAt: {
		type: Date,
		label: "Date created",
		autoValue: function() {
			if (this.isInsert) {
				return new Date
			} else {
				this.unset();
			}
		}
	},
	status: {
		label: "Staatus",
		type: String,
		optional: true,
		defaultValue: "Ootel"
	}
}));