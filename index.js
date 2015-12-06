var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var express = require('express')
var fs = require('fs')


// start the server
var app = express()
// app.use(express.static('client'))
app.use(express.static('public'))
app.listen(80, function() {
	console.log('Listening on port 80.')
})


// load all api endpoints
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(require('./server/auth.js'))
app.use(require('./server/params.js'))
var endpoints = ['account', 'response', 'survey']
endpoints.forEach(function(name) {
	var loader = require('./server/'+name+'.js')
	loader(app)
})


// connect to mongo
require('./server/db.js').init(function(err) {
	if (err) {
		console.log('ERROR CONNECTING TO THE DATABASE!')
		process.exit()
	} else
		console.log('Connected to the database.')
})
