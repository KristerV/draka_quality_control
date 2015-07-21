(function(){ProductsCollection = new Mongo.Collection('products')

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
	mapId: {
		type: String,
		label: "Toote parameeter",
		autoform: {
			type: "selectize",
			options: function() {

				// Find only useful maps
				var fetch = ProductMapCollection.find(
								{cooldownTime: {$nin: [null, ""]}},
								{sort: {code: 1}}
							).fetch()
				var list = _.map(fetch, function(obj, i) {
					return {label: obj.code + ", " + obj.description, value: obj._id}
				});

				return list
			},
		},
	},
	productCode: {
		type: Number,
		label: "Tootekood",
		autoValue: function() {
			if (this.isInsert) {
				var mapId = this.siblingField("mapId").value
				var map = ProductMapCollection.findOne(mapId)
				if (!map)
					return null
				return map.code
			}
		}
	},
	productDescription: {
		type: String,
		label: "Tootekirjeldus",
		autoValue: function() {
			if (this.isInsert) {
				var mapId = this.siblingField("mapId").value
				var map = ProductMapCollection.findOne(mapId)
				if (!map)
					return null
				return map.description
			}
		}
	},
	cooldownTime: {
		type: Number,
		decimal: true,
		label: "Jahtumise aeg",
		autoValue: function() {
			if (this.isInsert) {
				var mapId = this.siblingField("mapId").value
				var map = ProductMapCollection.findOne(mapId)
				if (!map)
					return null
				return parseFloat(map.cooldownTime)
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
		decimal: true,
		label: "Trumli pikkus",
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
		defaultValue: "Ootel",
		allowedValues: ["Ootel", "Katsetamisele", "Kinnitatud"]
	},
	measurements: {
		type: Array,
		optional: true,
	},
	"measurements.$": {
		type: Object,
		optional: true,
	},
	"measurements.$.label": {
		type: String,
		optional: true,
	},
	"measurements.$.resistance": {
		decimal: true,
		type: Number,
		optional: true,
	},
	"measurements.$.result": {
		decimal: true,
		type: Number,
		label: "",
		optional: true,
	},
	"measurements.$.name": {
		type: String,
		optional: true,
	},
	testerPerson: {
		label: "Katsetaja",
		type: String,
		optional: true,
	},
	notes: {
		label: "Märkused",
		type: String,
		optional: true,
		autoform: {
			rows: 4,
		}
	},
	passed: {
		optional: true,
		defaultValue: false,
		type: Boolean,
	},
	deleted: {
		optional: true,
		defaultValue: false,
		type: Boolean
	},
	measurementsTakenDatetime: {
		optional: true,
		type: Date
	}
}));

})();
