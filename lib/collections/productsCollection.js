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
		label: "Tootekood",
		autoform: {
			type: "select2",
			options: function() {
				return _.map(ProductMapCollection.find(
								{cooldownTime: {$nin: [null, ""]}, resistance: {$nin: [null, ""]}}, // filter empty resistance & cooldownTime
								{sort: {code: 1}}).fetch(), function(obj, i) {
					return {label: obj.code, value: obj._id}
				});
			},
		},
	},
	mapId: {
		type: String,
		label: "Kirjeldus",
		autoform: {
			type: "select2",
			options: function() {
				return _.map(ProductMapCollection.find(
								{cooldownTime: {$nin: [null, ""]}, resistance: {$nin: [null, ""]}}, // filter empty resistance & cooldownTime
								{sort: {code: 1}}).fetch(), function(obj, i) {
					return {label: obj.description, value: obj._id}
				});
			},
		},
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
	cooldownTime: {
		type: Number,
		decimal: true,
		autoValue: function() {
			if (this.isInsert) {
				var mapId = this.siblingField("mapId").value
				var map = ProductMapCollection.findOne(mapId)
				return parseFloat(map.cooldownTime)
			}
		}
	},
	resistance: {
		type: Number,
		decimal: true,
		autoValue: function() {
			if (this.isInsert) {
				var mapId = this.siblingField("mapId").value
				var map = ProductMapCollection.findOne(mapId)
				return parseInt(map.resistance)
			}
		}
	},
	status: {
		label: "Staatus",
		type: String,
		optional: true,
		defaultValue: "Ootel"
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
	}
}));