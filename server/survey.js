var db = require('./db.js')

module.exports = function(app) {
	app.get('/api/survey', GetSurveysForAccount)	// uses currently logged in account
	app.get('/api/survey/:id', GetSurveyByID)
	app.post('/api/survey', CreateSurvey)
	app.put('/api/survey/:id', UpdateSurvey)
	app.delete('/api/survey/:id', DeleteSurvey)

	app.post('/api/survey/open/:id', OpenSurvey)	// start accepting responses
	app.post('/api/survey/close/:id', CloseSurvey)	// stop accepting responses
}



function GetSurveysForAccount(req, res) {
	req.auth.mustBeLoggedIn(res, function(accountID) {

		var surveys = []

		db.collection('surveys').find({
			owner: accountID
		}).forEach(function(doc) {
			surveys.push(doc)
		}, function(err) {

			if (err)
				res.status(500).send()
			else
				res.status(200).json(surveys)

		})

	})
}
function GetSurveyByID(req, res) {
	try {
		req.params.id = db.id.createFromHexString(req.params.id)
	} catch (e) {
		res.status(404).send()
	}

	db.collection('surveys').findOne({
		_id: req.params.id
	}, function(err, doc) {

		if (err)
			res.status(500).send()
		else if (!doc)
			res.status(404).send()
		else
			res.status(200).json(doc)

	})
}
function CreateSurvey(req, res) {
	req.auth.mustBeLoggedIn(res, function(accountID) {
		req.requireParams({
			name: 'string',
			questions: 'array'
		}, function(params) {

			db.collection('surveys').insertOne({
				owner: accountID,
				published: false,
				closed: false,
				name: params.name,
				questions: params.questions
			}, function(err, result) {

				if (err)
					res.status(500).send()
				else
					res.status(200).send(result.insertedId.toString())

			})

		})
	})
}
function UpdateSurvey(req, res) {
	req.auth.mustBeLoggedIn(res, function(accountID) {
		req.requireParams({
			name: 'string',
			questions: 'array'
		}, function(params) {

			req.params.id = db.id.createFromHexString(req.params.id)

			_checkSurveyOwner(req.params.id, accountID, function(err, isOwner, published) {

				if (err)
					res.status(404).send()
				else if (!isOwner)
					res.status(403).send()
				else if (published)
					res.status(400).send('Cannot edit published surveys.')
				else {
					db.collection('surveys').updateOne({
						_id: req.params.id
					}, {
						'$set': {
							name: params.name,
							questions: params.questions
						}
					}, function(err) {

						if (err)
							res.status(500).send()
						else
							res.status(200).send()

					})
				}

			})

		})
	})
}
function DeleteSurvey(req, res) {
	req.auth.mustBeLoggedIn(res, function(accountID) {

		req.params.id = db.id.createFromHexString(req.params.id)
		_checkSurveyOwner(req.params.id, accountID, function(err, isOwner) {

			if (err)
				res.status(404).send()
			else if (!isOwner)
				res.status(403).send()
			else {
				// also delete all responses
				db.collection('responses').deleteMany({
					survey: req.params.id
				}, function(err) {

					if (err)
						res.status(500).send()
					else {
						db.collection('surveys').deleteOne({
							_id: req.params.id
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
function OpenSurvey(req, res) {
	req.auth.mustBeLoggedIn(res, function(accountID) {

		var surveyID = db.id.createFromHexString(req.params.id)
		_checkSurveyOwner(surveyID, accountID, function(err, isOwner) {

			if (err)
				res.status(404).send()
			else if (!isOwner)
				res.status(403).send()
			else {
				db.collection('surveys').updateOne({
					_id: surveyID
				}, {
					'$set': {
						published: true,
						closed: false
					}
				}, function(err) {

					if (err)
						res.status(500).send()
					else
						res.status(200).send()

				})
			}

		})

	})
}
function CloseSurvey(req, res) {
	req.auth.mustBeLoggedIn(res, function(accountID) {

		var surveyID = db.id.createFromHexString(req.params.id)
		_checkSurveyOwner(surveyID, accountID, function(err, isOwner) {

			if (err)
				res.status(404).send()
			else if (!isOwner)
				res.status(403).send()
			else {
				db.collection('surveys').updateOne({
					_id: surveyID
				}, {
					'$set': {
						published: true,
						closed: true
					}
				}, function(err) {

					if (err)
						res.status(500).send()
					else
						res.status(200).send()

				})
			}

		})

	})
}



function _checkSurveyOwner(surveyID, ownerID, cb) {
	db.collection('surveys').findOne({
		_id: surveyID
	}, {
		ownerID: 1,
		published: 1
	}, function(err, doc) {

		if (err || !doc)
			cb('ERROR')
		else
			cb(null, (doc.ownerID.equals(ownerID)), doc.published)

	})
}