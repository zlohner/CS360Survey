var express = require('express')
var fs = require('fs')


// start the server
var app = express()
app.use(express.static('client'))
app.listen(80, function() {
	console.log('Listening on port 80.')
})


// load all api endpoints
function apiLoad(folder) {
	app.get('/api'+folder, function(req, res) {
		res.status(404).send('Cannot GET /api'+folder)
	})

	fs.readdir('server'+folder, function(err, files) {
		files.forEach(function(file) {
			fs.stat('server'+folder+file, function(err, stats) {
				if (stats.isDirectory())
					apiLoad(folder+file+'/')
				else if (file.slice(-3) == '.js')
					app.get('/api'+folder+file.slice(0, -3), require('./server'+folder+file))
			})
		})
	})
}
apiLoad('/')
