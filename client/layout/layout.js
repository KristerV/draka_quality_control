Template.Layout.events({
    'click #exportCSV': function(e){
        Meteor.call('exportCSV', function(err, fileContent) {
			if (err)
				sAlert.error("Error: " + err)

			if(fileContent){
				var nameFile = "export-" + moment().format("d-MM-YYYY") + ".csv"
				var blob = new Blob([fileContent], {type: "text/plain;charset=utf-8"});
				saveAs(blob, nameFile);
			}
		});
    }
})
