
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
		var id = $(event.currentTarget).parents('[data-map-id]').attr('data-map-id')
		var value = $(event.currentTarget).val()
		var data = {}
		data[field] = value
		ProductMapCollection.update(id, {$set: data})
		sAlert.success("salvestatud", {timeout: 2000})
	}
}