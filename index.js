var express = require('express')


var app = express()
app.use(express.static('app'))
app.listen(80, function() {
	// we have a callback for some reason?
})