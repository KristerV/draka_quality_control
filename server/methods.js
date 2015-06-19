Meteor.methods({
	importCSV: function() {
	},
	insertTestData: function() {
		ProductMapCollection.batchInsert(testData)
	}
})