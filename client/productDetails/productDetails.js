Template.productDetails.helpers({
	measurements: function(){
		return this.measurements
	},
	measurementName: function() {
		return "measurement.$."+this.name
	}
})

Template.productDetails.events({
	'click button[name="delete-product"]': function(e) {
		var c = confirm("Kindel, et soovid toote kustutada?")
		if (c) {
			ProductsCollection.update(this._id, {$set: {deleted: true}})
			Router.go('/')
		}
	}
})