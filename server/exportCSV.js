Meteor.methods({
	exportCSV: function() {
		return exportcsv.exportToCSV(ProductsCollection.find().fetch(), true, "^");
	}
})