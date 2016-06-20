Template.productDetails.helpers({
	valueLabel: function() {
		return AutoForm.getFieldValue(this.current.label, 'updateProductForm')
	},
	valueResult: function() {
		return AutoForm.getFieldValue(this.current.result, 'updateProductForm')
	},
	valueResistance: function() {
		return AutoForm.getFieldValue(this.current.resistance, 'updateProductForm')
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