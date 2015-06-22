Meteor.methods({
	importData: function() {

		// Node.js modules
		var fs = Meteor.npmRequire('fs')
		var fiber = Meteor.npmRequire('fibers')

		// Read file
		fs.readFile(process.env.PWD + '/private/andmed.txt', 'utf8', function (err,data) {

			// Deal with error
			if (err)
				return console.log(err);

			// Turn data into lines
			var lines = data.split('\r\n')

			// For each row...
			_.each(lines, function(value, i){

				// Separate fields (code, description)
				var line = value.split("	")

				// Validate code
				if (!line[0] || !parseInt(line[0]))
					return false

				// parseInt so sorting works with .find()
				var code = parseInt(line[0])
				var desc = line[1]

				// Update or insert
				fiber(function(){ // Error if fiber is not used, not totally sure why.
					ProductMapCollection.upsert({code: code}, {$set: {code: code, description: desc}})
				}).run()
					
			})
		});
	},
})