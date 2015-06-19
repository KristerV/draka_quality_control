
var delay = 24 * 60 * 60 * 1000

// No need for checkProductsTimers. Client checks timer from productsList.js:timeLeft
Meteor.setInterval(function(){
	Meteor.call('importData')
},delay)


checkProductsTimers = function() {
	var products = ProductsCollection.find({status: 'Ootel'}).fetch()
	_.each(products, function(obj, i){
		var start = moment(obj.createdAt).valueOf() // Date to millisec
		var cooldown = obj.cooldownTime * 60 * 60 * 1000// hours to millisec
		var now = moment().valueOf() // millisec

		if (now > start + cooldown)
			ProductsCollection.update(obj._id, {$set: {status: 'Katsetamisele'}})
	})
}