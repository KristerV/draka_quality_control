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
	mapId: {
		type: String,
		label: "Kirjeldus",
		autoform: {
			type: "select2",
			options: function() {
				return _.map(ProductMapCollection.find(
								{cooldownTime: {$nin: [null, ""]}, resistance: {$nin: [null, ""]}}, // filter empty resistance & cooldownTime
								{sort: {code: 1}}).fetch(), function(obj, i) {
					return {label: obj.code + ", " + obj.description, value: obj._id}
				});
			},
		},
	},
	productCode: {
		type: String,
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
	resistance: {
		type: Number,
		decimal: true,
		label: "Takistus",
		autoValue: function() {
			if (this.isInsert) {
				var mapId = this.siblingField("mapId").value
				var map = ProductMapCollection.findOne(mapId)
				return parseFloat(map.resistance)
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
		label: "Kogus meetrites",
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
	drumLength: {
		label: "Trumli pikkus",
		type: Number,
		decimal: true,
		optional: true,
	},
	PRU: {
		label: "PRU Takistus",
		type: Number,
		decimal: true,
		optional: true,
	},
	MU: {
		label: "MU takistus",
		type: Number,
		decimal: true,
		optional: true,
	},
	HA: {
		label: "HA takistus",
		type: Number,
		decimal: true,
		optional: true,
	},
	KORO: {
		label: "KORO takistus",
		type: Number,
		decimal: true,
		optional: true,
	},
	HESI: {
		label: "HESI takistus",
		type: Number,
		decimal: true,
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
	}
}));