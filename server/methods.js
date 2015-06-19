Meteor.methods({
	importCSV: function() {
		var fs = Meteor.npmRequire('fs')
		var fiber = Meteor.npmRequire('fibers')
		fs.readFile(process.env.PWD + '/private/file.txt', 'utf8', function (err,data) {
			if (err) {
				return console.log(err);
			}
			var lines = data.split('\r\n')
			_.each(lines, function(value, i){
				var line = value.split("	")
				if (!line[0] || !parseInt(line[0])) {
					return false
				}

				fiber(function(){
					ProductMapCollection.upsert({code: line[0]}, {code: line[0], description: line[1]})
					/*var map = ProductMapCollection.findOne({code: line[0]})
					if (map)
						ProductMapCollection.update(map._id, {$set: {description: line[1]}})
					else
						ProductMapCollection.insert({code: line[0], description: line[1]})*/

				}).run()
					
			})
		});
	},
	insertTestData: function() {
		ProductMapCollection.batchInsert(testData)
	}
})