Template.productsList.helpers({
	products: function() {
		var filters = []
		if (Session.get('filterOotel'))
			filters.push('Ootel')
		if (Session.get('filterKatsetamisele'))
			filters.push('Katsetamisele')
		if (Session.get('filterKinnitatud'))
			filters.push('Kinnitatud')
		return ProductsCollection.find({status: {$in: filters}},{sort: {createdAt: 1}})
	},
	productDescription: function() {
		var map = ProductMapCollection.findOne(this.mapId)
		if (!map)
			return false
		return map.description
	},
	timeLeft: function() {
		if (this.status != 'Ootel')
			return this.status
		var map = ProductMapCollection.findOne(this.mapId)
		if (!map)
			return null

		var start = moment(this.createdAt)
		
		var cooldownTime = map.cooldownTime
		if (!cooldownTime)
			return null

		// Manual control if product is ready
		if (start.add(cooldownTime, 'hours') < moment(TimeSync.serverTime()))
			return "valmis"
		var difference = start.add(cooldownTime, 'hours').subtract(TimeSync.serverTime())
		var duration = moment.duration(difference.valueOf())
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
	}
})
