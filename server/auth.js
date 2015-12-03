var db = require('./db.js')


module.exports = function(req, res, next) {
	if (req.cookies.auth) {
		db.collection('accounts').findOne({
			token: req.cookies.auth
		}, function(err, account) {
			if (err)
				res.status(500).send()
			else if (!account) {
				res.cookie('auth', '')
				res.cookie('username', '')
				req.auth = new AuthHandler({})
				next()
			} else {
				req.auth = new AuthHandler(account)
				next()
			}
		})
	} else {
		req.auth = new AuthHandler({})
		next()
	}
}



function AuthHandler(account) {
	this._account = account
}

AuthHandler.prototype.mustBeLoggedIn = function(res, cb) {
	if (this._account._id)
		cb(this._account._id)
	else
		res.status(403).send()
}