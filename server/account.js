var db = require('./db.js')
var bcrypt = require('bcrypt')
var uuid = require('uuid')

module.exports = function(app) {
	app.get('/api/account', Login)
	app.post('/api/account', CreateNewAccount)
	app.put('/api/account', UpdateAccount)	// uses currently logged in account
	app.delete('/api/account', DeleteAccount)	// uses currently logged in account
}



function Login(req, res) {
	req.requireParams({
		username: 'string',
		password: 'string'
	}, function(params) {

		params.username = params.username.toLowerCase()

		_getAccountByName(params.username, function(err, account) {
			if (err)
				res.status(500).send()
			else if (!account)
				res.status(404).send('No account with that name exists.')
			else {
				_checkCredentials(account, params.password, function(err, valid) {
					if (err)
						res.status(500).send()
					else if (!valid)
						res.status(401).send('Username and password do not match.')
					else {
						res.cookie('auth', account.token)
						res.cookie('username', account.username)
						res.status(200).send()
					}
				})
			}
		})

	})
}
function CreateNewAccount(req, res) {
	req.requireParams({
		username: 'string',
		password: 'string'
	}, function(params) {

		params.username = params.username.toLowerCase()

		_checkUsernameExists(username, function(err, exists) {

			if (err)
				res.status(500).send()
			else if (exists)
				res.status(409).send('Username is in use.')
			else {
				var token = _generateToken()
				_hashPassword(rawPassword, function(err, hash) {
					if (err)
						res.status(500).send()
					else {
						db.collection('accounts').insertOne({
							username: username,
							password: hash,
							token: token
						}, function(err) {
							if (err)
								res.status(500).send()
							else
								res.status(200).send()
						})
					}
				})
			}

		})

	})
}
function UpdateAccount(req, res) {
	req.auth.mustBeLoggedIn(res, function(accountID) {
		req.requireParams({
			password: 'string'
		}, function() {

			_hashPassword(params.password, function(err, hash) {
				db.collection('accounts').updateOne({
					_id: accountID
				}, {
					'$set': {
						password: hash
					}
				}, function(err) {
					if (err)
						res.status(500).send()
					else
						res.status(200).send()
				})
			})
		})
	})
}
function DeleteAccount(req, res) {
	req.auth.mustBeLoggedIn(res, function(accountID) {
		db.collection('accounts').deleteOne({
			_id: accountID
		}, function(err) {
			if (err)
				res.status(500).send()
			else {
				res.cookie('auth', '')
				res.cookie('username', '')
				res.status(200).send()
			}
		})
	})
}



function _checkCredentials(account, password, cb) {
	bcrypt.compare(password, account.password, cb)
}
function _checkUsernameExists(username, cb) {
	db.collection('accounts').count({
		username: username
	}, function(err, count) {
		if (err)
			cb(err)
		else
			cb(err, (count > 0))
	})
}
function _generateToken(cb) {
	cb(uuid.v1())
}
function _getAccountByName(username, cb) {
	db.collection('accounts').findOne({
		username: username
	}, cb)
}
function _hashPassword(password, cb) {
	bcrypt.hash(password, 8, cb)
}