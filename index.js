var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var express = require('express')
var fs = require('fs')


// start the server
var app = express()
app.use(express.static('client'))
app.listen(80, function() {
	console.log('Listening on port 80.')
})


// load all api endpoints
app.use(cookieParser())
app.use(bodyParser.json())
(require('./server/survey.js'))(app)