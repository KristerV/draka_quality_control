Settings = {
	tableHeaders: ["Kood", "Kirjeldus", "Jahtumise aeg"],
	measurements: {
		// Jutumärkides olevaid väärtusi võid alati muuta, aga koolonist eespool
		// väärtusi ära muuda. Lisada võid küll. Koolonist eespool olevad
		// väärtused  kannatavad ainult tähti ja numbreid.
		measurement1: "measurement1",
		measurement2: "measurement2",
		measurement3: "measurement3",
		measurement4: "measurement4",
	},
	getMeasurementsSchema: function() {
		return _.map(Settings.measurements, function(value, key){
			value = new Spacebars.SafeString(value)
			return {label: value, value: key}
		})
	}
}

// So Settings can be used in templates with {{$.Settings.whatever}}
if (Meteor.isClient) {
	Helpers.addScope('Settings', Settings)
}
