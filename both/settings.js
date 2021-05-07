Settings = {
	tableHeaders: ["Kood", "Kirjeldus", "Jahtumise aeg"],
	measurements: {
		// Jutumärkides olevaid väärtusi võid alati muuta, aga koolonist eespool
		// väärtusi ära muuda. Lisada võid küll. Koolonist eespool olevad
		// väärtused  kannatavad ainult tähti ja numbreid.
		L1PRUUN: "L1 Pruun",
		L2MUST: "L2 Must",
		L3HALL: "L3 Hall",
		PENKOROKANDETROSS: "KoRo / KoSi Kandetross",
		NSININE: "N-SININE",
		L4VALGE: "Valge / Kollane",
		L5PUNANE: "L5-PUNANE",
		VARJESTUS: "Varjestus",
	},
	KSMdatapath: '/mnt/srv193-01ee/data/',
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
