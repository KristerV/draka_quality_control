Router.configure({
	waitOn: function() {
		return [Meteor.subscribe('products'), Meteor.subscribe('productMap')]
	}
});

Router.route('/', function () {
	this.render('productsList');
});

Router.route('/product/:id', function () {
	this.render('productDetails');
});

Router.route('/productMap', function () {
	this.render('productMap');
});