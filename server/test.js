module.exports = function(app) {
	app.get('/api/test/:id', function(req, res) {
		res.send('You asked for "'+req.params.id+'"')
	})
	app.get('/api/test', function(req, res) {
		res.send('You didn\'t specify an id')
	})
	app.post('/api/test', function(req, res) {
		res.send('You tried to create a new... thing')
	})
	app.delete('/api/test/:id', function(req, res) {
		res.send('You tried to delete "'+req.params.id+'"')
	})
	app.put('/api/test/:id', function(req, res) {
		res.send('You tried to update "'+req.params.id+'"')
	})
}