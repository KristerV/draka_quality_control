AutoForm.addHooks(['insertProductForm'], {
	before: {
		insert: function(doc) {
			var map = ProductMapCollection.findOne(doc.mapId)
			doc['measurements'] = []
			_.each(Settings.measurements, function(value, key) {
				if (map[key]) {
					doc.measurements.push({label: value, name: key, resistance: map[key]})
				}
			})
			return doc
		}
	},
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
				doc.$set.testerPerson) 
			{
				doc.$set.status = "Kinnitatud"
			}

			// If resistances passed the tests
			var measurements = doc.$set.measurements
			var passed = true
			for (var i = measurements.length - 1; i >= 0; i--) {
				if (measurements[i].result <= measurements[i].resistance) {
					passed = passed && true
				}
				else {
					passed = false
				}
			}
			doc.$set.passed = passed
			return doc

		}
	},
})