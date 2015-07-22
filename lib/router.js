Router.configure({
	waitOn: function() {
		return [Meteor.subscribe('products'), Meteor.subscribe('productMap')]
	}
});

Router.route('/', function () {
	var msgSuccess = this.params.query.msgSuccess
	if (msgSuccess)
		sAlert.success(msgSuccess)
	this.render('productsList');
});

Router.route('/product/:id', function () {
	var productId = this.params.id
	this.render('productDetails', {
		data: function() {
			return ProductsCollection.findOne(productId)
		}
	});
});

Router.route('/stats', function() {
	this.render('stats')
})

Router.route('/productMap', function () {
	this.render('productMap');
});

Meteor.startup(function(){
	standardFields = ["Kood", "Kirjeldus,", "Jahtumise aeg"]
	var measurementFields = _.map(Settings.measurements, function(value, key){
		return value
	})
	standardFields.splice.apply(standardFields, [2, 0].concat(measurementFields));
	this.Pages = new Meteor.Pagination(ProductMapCollection, {
		router: "iron-router",
		homeRoute: "/productMap/",
		route: "/productMap/",
		routerTemplate: "productMap",
		itemTemplate: 'productMapItem',
		sort: {
			code: -1,
			description: 1,
			_id: 1,
		},
		perPage: 100,
		table: {
			"class": "table",
			standardFields: standardFields,
			header: _.map(standardFields, function(f) {
				return f[0].toUpperCase() + f.slice(1);
			}),
			wrapper: "table-wrapper"
		}
	});
})
