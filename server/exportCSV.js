Meteor.methods({
	exportCSV: function() {
		// var products = ProductsCollection.find().fetch()
		var products = ProductsCollection.find({deleted: false}).fetch()
		var mapped = []

		// Add measurements to the table
		_.each(products, function(product, i){

			var ordered = {}

			// Manually sort data
			ordered.Loodud = moment(product.createdAt).format("D.MM.YYYY") || ""
			ordered.Partii = product.batch || ""
			ordered.Tootmistellimus = product.orderNumber || ""
			ordered.Tootekood = product.productCode || ""
			ordered.Tootekirjeldus = product.productDescription || ""
			ordered["Trumli pikkus"] = product.quantity || ""
			ordered["Jahtumise aeg (h)"] = product.cooldownTime || ""
			ordered.Staatus = product.status || ""
			ordered.Katsetaja = product.testerPerson || ""
			ordered["Märkused"] = product.notes || ""
			ordered["Tulemus edukas"] = product.passed || ""
			ordered["Mõõtmised tehti"] = moment(product.measurementsTakenDatetime).format("D.MM.YYYY") || ""

			// Create empty measurements
			_.each(Settings.measurements, function(label, key){
				ordered[label] = ""
			})

			// Fill measurements
			_.each(product.measurements, function(measurement, i) {
				if (measurement.result && !_.isUndefined(ordered[measurement.label]))
					ordered[measurement.label] = measurement.result
			})

			// Add to array
			mapped.push(ordered)
		})

		return exportcsv.exportToCSV(mapped, true, "^");
	}
})
