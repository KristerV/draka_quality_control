Template.productsList.helpers({
	products: function() {
		return ProductsCollection.find({},{sort: {createdAt: 1}})
	},
	productDescription: function() {
		var map = ProductMapCollection.findOne(this.mapId)
		if (!map)
			return false
		return map.description
	},
	timeLeft: function() {
		var map = ProductMapCollection.findOne(this.mapId)
		if (!map)
			return null

		var start = moment(this.createdAt)
		var cooldownTime = map.cooldownTime
		var now = start.add(cooldownTime, 'hours').subtract(TimeSync.serverTime())
		var duration = moment.duration(now.valueOf())
		var dayString;
		if (duration.days() == 0)
			dayString = ""
		else if (duration.days() == 1)
			dayString = "D päev, "
		else
			dayString = "D päeva, "

		return duration.format(dayString+"HH:mm:ss")
	}
})
