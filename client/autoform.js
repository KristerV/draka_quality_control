AutoForm.addHooks(['insertProductForm'], {
	onSuccess: function(formType, result) {
		$('#new-product-dialog').modal('hide')
		sAlert.success("Uus toode sisestatud")
		$('select')[0].selectize.clear()
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
				doc.$set.HESI &&
				doc.$set.testerPerson) 
			{
				doc.$set.status = "Kinnitatud"
			}

			// If resistances passed the tests
			if (
				this.currentDoc.resistance >= doc.$set.PRU &&
				this.currentDoc.resistance >= doc.$set.MU &&
				this.currentDoc.resistance >= doc.$set.HA &&
				this.currentDoc.resistance >= doc.$set.KORO &&
				this.currentDoc.resistance >= doc.$set.HESI)
			{
				doc.$set.passed = true
			} else {
				doc.$set.passed = false
			}
			return doc

		}
	},
})