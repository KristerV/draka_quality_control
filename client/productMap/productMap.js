
// NB! Table is created in router.js with Meteor.Pagination()

Template.productMapItem.helpers({
	measurements: function() {
		return _.map(Settings.measurements, function(value, key) {
			return {label: value, name: key, value: this[key]}
		}.bind(this))
	}
})

Meteor.startup(function(){
	var productMapEvents = {
		'click button[name="import-csv"]': function(e){
			Meteor.call('importData')
		},
		'change input.measurement-input': function(e){
			ProductMap.updateField(e)
		},
		'change input[name="cooldownTime"]': function(e){
			ProductMap.updateField(e)
		},
		'change input#descriptionFilter': function(e) {
			var regex = new RegExp(e.target.value,"gi");
			Pages.set({filters: {description: regex}})
		},
	}
	productMapEvents['click th:contains(' + Settings.tableHeaders[0] + ')'] = function(e) {
		if (Pages.get('sort').code === 1) {
			Pages.set({
				sort: {
					code: -1,
					_id: -1,
				}
			});
		} else {
			Pages.set({
				sort: {
					code: 1,
					_id: 1,
				}
			});
		}
	}
	productMapEvents['click th:contains(' + Settings.tableHeaders[1] + ')'] = function(e) {
		if (Pages.get('sort').description === 1) {
			Pages.set({
				sort: {
					description: -1,
					_id: -1,
				}
			});
		} else {
			Pages.set({
				sort: {
					description: 1,
					_id: 1,
				}
			});
		}
	}
	Template.productMap.events(productMapEvents)
});

ProductMap = {
	updateField: function(event) {

		var field = event.currentTarget.name

		// Get values
		var id = $(event.currentTarget).parents('[data-map-id]').attr('data-map-id')
		var value = $(event.currentTarget).val()

		// Check for commas
		if (value.indexOf(',') >= 0) {
			sAlert.error('Palun kasuta koma asemel punkti, nt. 0.34')
			return false
		}

		// Save
		var data = {}
		data[field] = value
		ProductMapCollection.update(id, {$set: data})

		// Notify
		sAlert.success("salvestatud", {timeout: 2000})
	}
}
