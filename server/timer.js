
var delay = 24 * 60 * 60 * 1000

Meteor.setInterval(function(){
	Meteor.call('importData')
},delay)