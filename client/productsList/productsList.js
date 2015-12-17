Template.productsList.helpers({
	products: function() {
		// Filter fields
		var filter = ['Ootel', 'Katsetamisele']
		if (Session.get('filterKinnitatud'))
			filter.push('Kinnitatud')

		// Find
		var find = {status: {$in: filter}, deleted: {$ne: true}}
		var regex = Session.get('productListDescriptionRegex')
		if (typeof regex === 'object')
			regex = ".*"
		find.productDescription = {$regex: RegExp(regex, "gi")}

		// Sorting
		var sortField = Session.get('sortProductListBy')

		return ProductsCollection.find(find,{sort: sortField})
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
	'change input#descriptionFilter': function(e) {
		// var regex = new RegExp(e.target.value,"gi");
		var regex = e.target.value

		// Session is not able to pass regex objects reactivly
		Session.set("productListDescriptionRegex", regex)
	},
	'click th.sort-enabled': function(e) {
		var sortField = e.target.id
		var currentSort = Session.get("sortProductListBy")
		var sortObj = {}
		if (currentSort && sortField in currentSort) {
			sortObj[sortField] = currentSort[sortField] * -1
		} else {
			sortObj[sortField] = -1
		}
		Session.set("sortProductListBy", sortObj)
	}
})
