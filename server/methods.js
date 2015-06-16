Meteor.methods({
	importCSV: function() {
		/*Baby.parse("http://mysafeinfo.com/api/data?list=dowjonescompanies&format=csv", {
			download: true,
			dynamicTyping: true,
			delimiter: ",",
			complete: function(results) {
				console.log(results);
			},
		});*/
		CSV.readCsvFileLineByLine(process.env.PWD + '/testandmed.csv', {
			delimiter: "^",
			dynamicTyping: true,
			// headers: true,
		}, function (line, index, rawParsedLine) {
			if (line.length < 2) // parser gets empty rows from somewhere
				return false
			var first = line[0]
			var second = line[1]
			console.log(first)
			console.log(second)
		});
	}
})