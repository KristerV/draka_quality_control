Template.productDetails.events({
	'click button[name="delete-product"]': function(e) {
		var c = confirm("Kindel, et soovid toote kustutada?")
		if (c) {
			ProductsCollection.update(this._id, {$set: {deleted: true}})
			Router.go('/')
		}
	}
})