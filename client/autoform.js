AutoForm.addHooks(['insertProductForm'], {
	onSuccess: function(formType, result) {
		$('#new-product-dialog').modal('hide')
		sAlert.success("Uus toode sisestatud")
	},
	onError: function(formType, error) {
		sAlert.error("Error: " + error)
	},
});

AutoForm.addHooks(['updateProductForm'], {
	before: {
		update: function(doc) {

			// If all testing flieds are filled, confirm product
			if (doc.$set.drumLength &&
				doc.$set.PRU &&
				doc.$set.MU &&
				doc.$set.HA &&
				doc.$set.KORO &&
				doc.$set.testerPerson) {
				doc.$set.status = "Kinnitatud"
			}
			return doc

		}
	},
})