Settings = {
	measurements: {
		// The key is used to insert to DB, so don't change already existing names there.
		// The value is what is displayed and can be changed at any time.
		measurement1: "measurement1",
		measurement2: "measurement2",
		measurement3: "measurement3",
		measurement4: "measurement4",
	},
	getMeasurementsSchema: function() {
		return _.map(Settings.measurements, function(value, key){
			return {label: value, value: key}
		})
	}
}

// So Settings can be used in templates with {{$.Settings.whatever}}
if (Meteor.isClient) {
	Helpers.addScope('Settings', Settings)
}