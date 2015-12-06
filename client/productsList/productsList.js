Template.productsList.helpers({
	products: function() {
		var filter = ['Ootel', 'Katsetamisele']
		if (Session.get('filterKinnitatud'))
			filter.push('Kinnitatud')
		return ProductsCollection.find({status: {$in: filter}, deleted: {$ne: true}},{sort: {createdAt: 1}})
	},
	timeLeft: function() {

		// Only calculate time left for products waiting for timer
		if (this.status != 'Ootel')
			return this.status

		// Get product map
		var map = ProductMapCollection.findOne(this.mapId)
		if (!map)
			return null

		var timer = moment(this.createdAt) // start
		var cooldownTime = this.cooldownTime // cooldown, in hours
		timer.add(cooldownTime, 'hours') // timer finish datetime

		// Manual check if product is ready
		if (timer < moment(TimeSync.serverTime())) {
			ProductsCollection.update(this._id, {$set: {status: "Katsetamisele"}})
			return "valmis"
		}

		timer.subtract(TimeSync.serverTime()) // time left
		var duration = moment.duration(timer.valueOf())

		// Let's be grammatically correct
		var dayString;
		if (duration.days() == 0)
			dayString = ""
		else if (duration.days() == 1)
			dayString = "D päev, "
		else
			dayString = "D päeva, "

		return duration.format(dayString+"HH:mm:ss")
	},
	resistance: function() {
		var map = ProductMapCollection.findOne(this.mapId)
		if (!map)
			return null

		return map.resistance
	},
	moment: function(date) {
		return moment(date).format("DD.MM.YY")
	}
})
Template.productsList.events({
	'click button[name="Ootel"]': function(e) {
		var current = Session.get("filterOotel")
		Session.set("filterOotel", !current)
	},
	'click button[name="Katsetamisele"]': function(e) {
		var current = Session.get("filterKatsetamisele")
		Session.set("filterKatsetamisele", !current)
	},
	'click button[name="Kinnitatud"]': function(e) {
		var current = Session.get("filterKinnitatud")
		Session.set("filterKinnitatud", !current)
	},
	'click tr.clickable': function(e) {
		var productId = $(e.currentTarget).attr('data-product-id')
		Router.go('/product/'+productId)
	},
})
