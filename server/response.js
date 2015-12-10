var db = require('./db.js')

module.exports = function(app) {
	app.get('/api/response/:survey', GetResponses)
	app.post('/api/response/:survey', SubmitResponse)
}



function GetResponses(req, res) {
	req.auth.mustBeLoggedIn(res, function(accountID) {
		req.params.survey = db.id.createFromHexString(req.params.survey)
		_checkSurveyOwner(req.params.survey, accountID, function(err, isOwner) {
			if (err)
				res.status(404).send()
			else if (!isOwner)
				res.status(403).send()
			else {
				var responses = []
				var page = 0
				if (req.query.page)
					page = req.query.page

				db.collection('responses').find({
					survey: req.params.survey
				}).skip(20*page).limit(20).forEach(function(doc) {
					responses.push(doc)
				}, function(err) {

					if (err)
						res.status(500).send()
					else
						res.status(200).json(responses)
				})
			}
		})
	})
	// paginate responses

	// return response
}



function SubmitResponse(req, res) {
	req.requireParams({
		data: 'array'
	}, function(params) {

		req.params.survey = db.id.createFromHexString(req.params.survey)
		_checkSurveyAcceptsResponse(req.params.survey, params.data, function(err, isOpen, isValid) {

			if (err)
				res.status(404).send()
			else if (!isOpen)
				res.status(403).send('Survey is not accepting responses.')
			else if (!isValid)
				res.status(400).send('Survey expects a different number of fields.')
			else {
				db.collection('responses').insertOne({
					survey: req.params.survey,
					timestamp: Date(),
					data: params.data
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
		owner: 1,
		published: 1
	}, function(err, doc) {

		if (err || !doc)
			cb('ERROR')
		else
			cb(null, (doc.owner.equals(ownerID)), doc.published)

	})
}



function _checkSurveyAcceptsResponse(survey, response, cb) {
	db.collection('surveys').findOne({
		_id: survey
	}, function(err, doc) {

		if (err)
			cb(err)
		else if (!doc)
			cb('Not found')
		else if (!doc.published)
			cb(null, false)
		else if (doc.closed)
			cb(null, false)
		else if (doc.questions.length != response.length)
			cb(null, true, false)
		else
			cb(null, true, true)

	})
}
