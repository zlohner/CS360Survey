var auth = require('./auth.js')

module.exports = function(app) {
	app.post('/api/survey', function(req, res) {
		CreateSurvey(req, res)
	})
}


function CreateSurvey(req, res) {
	data = req.body

	if (auth.hasPermission(req, 'survey', 'create')) {
		// ...
	}

	res.send('in progress')
}