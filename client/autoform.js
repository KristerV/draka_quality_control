AutoForm.addHooks(['insertProductForm'], {
	onSuccess: function(formType, result) {
		$('#new-product-dialog').modal('hide')
		sAlert.success("Uus toode sisestatud")
	},
	onError: function(formType, error) {
		sAlert.error("Ebaõnnestus: " + error)
	},
});