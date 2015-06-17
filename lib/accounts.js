Meteor.startup(function(){
	if (Meteor.isServer) {
		if (Meteor.users.find().fetch().length > 0) {
			Accounts.config({forbidClientAccountCreation: true})
		}
	} else if (Meteor.isClient) {
		Accounts.ui.config({
			passwordSignupFields: "USERNAME_ONLY"
		})
	}
})