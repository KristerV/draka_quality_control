Router.configure({
	waitOn: function() {
		return [Meteor.subscribe('products'), Meteor.subscribe('productMap')]
	}
});

Router.route('/', function () {
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

Router.route('/productMap', function () {
	this.render('productMap');
});

fields = ["Kood", "Kirjeldus", "Takistus", "Jahtumise aeg"];
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
		fields: fields,
		header: _.map(fields, function(f) {
			return f[0].toUpperCase() + f.slice(1);
		}),
		wrapper: "table-wrapper"
	}
});