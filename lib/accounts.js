Meteor.startup(function(){
	if (Meteor.isServer) {
		Accounts.validateNewUser(function(){
			var count = Meteor.users.find().fetch().length
			if (count > 0) {
				new Meteor.Error("Ainult üks konto on lubatud")
				return false
			} else {
				return true
			}
		})
	} else if (Meteor.isClient) {
		Accounts.ui.config({
			passwordSignupFields: "USERNAME_ONLY"
		})
	}
})