Meteor.methods({
	exportCSV: function() {
		// var products = ProductsCollection.find().fetch()
		var products = ProductsCollection.find().fetch()
		var mapped = []

		_.each(products, function(product, i){
			_.each(product.measurements, function(measurement, i) {
				if (measurement.result)
					product[measurement.label] = measurement.result
			})
			delete product.measurements
			mapped.push(product)
		})

		return exportcsv.exportToCSV(mapped, true, "^");
	}
})
