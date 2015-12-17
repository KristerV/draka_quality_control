
Meteor.setInterval(function(){
	Meteor.call('importData')
}, 24 * 60 * 60 * 1000)

Meteor.setInterval(function(){
	Meteor.call('import-KSM-data')
}, 5 * 60 * 1000)
