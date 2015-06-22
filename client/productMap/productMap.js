
// NB! Table is created in router.js with Meteor.Pagination()

Template.productMap.events({
	'click button[name="import-csv"]': function(e){
		Meteor.call('importData')
	},
	'change input[name="resistance"]': function(e){
		ProductMap.updateField(e, "resistance")
	},
	'change input[name="cooldownTime"]': function(e){
		ProductMap.updateField(e, "cooldownTime")
	},
})

ProductMap = {
	updateField: function(event, field) {

		// Get values
		var id = $(event.currentTarget).parents('[data-map-id]').attr('data-map-id')
		var value = $(event.currentTarget).val()
		var data = {}

		// Check for commas
		if (value.indexOf(',') >= 0) {
			sAlert.error('Palun kasuta koma asemel punkti, nt. 0.34')
			return false
		} else if (!value) {
			sAlert.error('Kindel, et kirjutasid numbri? Muide, koma asemel kasutame punkti.')
			return false
		}

		// Save
		data[field] = value
		ProductMapCollection.update(id, {$set: data})

		// Notify
		sAlert.success("salvestatud", {timeout: 2000})
	}
}