Router.configure({
	layoutTemplate: 'Layout',
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

Router.route('/stats', {
	action: function() {
		this.render('stats')
	}
})

Router.route('/ksm', {
	waitOn: function(){
		return [Meteor.subscribe('ksm')]
	},
	action: function() {
		this.render('ksm')
	}
})

Router.route('/productMap', function () {
	this.render('productMap');
});

Meteor.startup(function(){
	standardFields = Settings.tableHeaders
	var measurementFields = _.map(Settings.measurements, function(value, key){
		return value
	})
	standardFields.splice.apply(standardFields, [2, 0].concat(measurementFields));
	var settings = {
		filters: {},
		availableSettings: {
			filters: true,
			settings: true,
			sort: true,
		},
		sort: {
			code: -1,
			_id: -1,
		},
		router: "iron-router",
		homeRoute: "/productMap/",
		route: "/productMap/",
		routerTemplate: "productMap",
		itemTemplate: 'productMapItem',
		perPage: 100,
		table: {
			"class": "table",
			standardFields: standardFields,
			header: _.map(standardFields, function(f) {
				return f[0].toUpperCase() + f.slice(1);
			}),
			wrapper: "table-wrapper"
		}
	}
	this.Pages = new Meteor.Pagination(ProductMapCollection, settings);
})
