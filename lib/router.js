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