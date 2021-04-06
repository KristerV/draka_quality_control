Meteor.methods({
	importData: function() {
		var projectRoot = process.cwd().split('.meteor')[0]

		// Node.js modules
		var fs = Meteor.npmRequire('fs')
		var fiber = Meteor.npmRequire('fibers')

		// Read file
		var datapath = process.env.NODE_ENV === 'development' ?
			projectRoot+'private/andmed.txt'
            :
            '/home/zhdan/draka_quality_control/private/andmed.txt'

		fs.readFile(datapath, 'utf8', function (err,data) {

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
