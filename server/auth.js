module.exports = {
	hasPermission: function(req) {
		retrieveAuth(req)

		if (req.auth.test) {
			return true
		} else {
			return false
		}
	},
	login: function(res, account) {
		res.cookie('auth', '12345')
	}
}


function retrieveAuth(req) {
	if (!req.auth) {
		if (req.cookies.auth) {
			// verify auth...
			req.auth = {}
		} else
			req.auth = {}
	}
}