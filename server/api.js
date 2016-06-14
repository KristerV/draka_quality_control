/*Meteor.startup(function () {
	var Api = new Restivus({
			useDefaultAuth: false,
			prettyJson: true,
			enableCors: true
		});

		Api.addCollection(ProductMapCollection);
		Api.addCollection(ProductsCollection);

		Api.addRoute('add', {authRequired: false}, {
			post: function() {
				var tmp = ProductsCollection.insert(this.bodyParams);
				if(tmp){
				  return {status: 'success', data: tmp};
				}
				return {
				  statusCode: 400,
				  body: {status: 'fail', message: 'Unable to CREATE subscriber!'}
				};
				/*var product = this.urlParams.string;
				var query = this.queryParams;
				console.log(product);
				console.log(query);
				return*/
				
		/*	}
		});

		Api.addRoute('search/:string', {authRequired: false}, {
			get: function() {
				var string = this.urlParams.string;
				if(string.match(/^\d+$/)){
					return ProductMapCollection.findOne({'code': parseInt(string)});
				}
				else{
					return ProductMapCollection.findOne({'description': string});
				}
		    }
		});

		

});*/

Meteor.startup(function () {
	var f = process.env.METEOR_OFFLINE_CATALOG;
	console.log(f);
});