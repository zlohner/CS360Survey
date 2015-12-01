var express = require('express')


var app = express()
app.use(express.static('client'))
app.listen(80, function() {
	// we have a callback for some reason?
})

app.get('/cat', function(req, res) {
	res.send('it\'s a cat!')
})