
var delay = 10 * 1000

Meteor.setInterval(function(){
	checkProductsTimers()
},delay)


checkProductsTimers = function() {
	var products = ProductsCollection.find({status: 'Ootel'}).fetch()
	_.each(products, function(obj, i){
		var start = moment(obj.createdAt).valueOf() // Date to millisec
		var cooldown = ProductMapCollection.findOne(obj.mapId).cooldownTime * 60 * 60 * 1000// hours to millisec
		var now = moment().valueOf() // millisec

		if (now > start + cooldown)
			ProductsCollection.update(obj._id, {$set: {status: 'Katsetamisele'}})
	})
}