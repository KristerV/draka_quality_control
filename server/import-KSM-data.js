Meteor.startup(function(){
    Meteor.call('import-KSM-data')
});
Meteor.methods({
    "import-KSM-data": function(){

		// Node.js modules
		var fs = Meteor.npmRequire('fs')
		var fiber = Meteor.npmRequire('fibers')

        // KSM has 6 'lines' that need to be read

        var files = ['6.liin.dat', '8.liin.dat', '21.liin.dat', '22.liin.dat', '36-1.liin.dat', '38.liin.dat']
        var datapath = process.env.NODE_ENV === 'development' ?
            '/home/krister/code/draka_quality_control/private/KSM_andmed/'
            :
            Settings.KSMdatapath

        files.forEach(function(filename){

    		// Read file
    		fs.readFile(datapath + filename, 'utf8', function (err,data) {

    			// Deal with error
    			if (err)
    				return console.error(err);

    			// Turn data into lines
    			var lines = data.split('\r\n')

    			// For each row...
                var lastRow = []
    			_.each(lines, function(value, i){
                    var rowType = i % 2 ? 'data' : 'titles'

    				// Separate fields (code, description)
    				var line = value.split("	")

    				// If titles row
                    if (rowType === 'titles') {
                        lastRow = line
                        return
                    }

                    // compile object with data
                    var data = {}
                    for (var i = 0; i < line.length; i++) {
                        var key = lastRow[i].replace(/^"(.*)"$/, '$1');
                        data[key] = Number(line[i]) || line[i]
                    }


    				// Update or insert
    				fiber(function(){ // Error if fiber is not used, not totally sure why.
                        KSMCollection.upsert({
                            measure_time: data.measure_time,
                            extra1: data.extra1,
                            info4: data.info4, // line name
                            wall_extra_percent: data.wall_extra_percent,
                        }, {$set: data})
    				}).run()

    			})
    		});
        })
	}
});
