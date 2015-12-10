module.exports = function(req, res, next) {
	var data = {}
	if (typeof(req.query) == 'object') {
		for (key in req.query)
			data[key] = req.query[key]
	}
	if (typeof(req.body) == 'object') {
		for (key in req.body)
			data[key] = req.body[key]
	}

	req.requireParams = function(scheme, cb) {
		validateScheme(data, scheme, function(err, data) {
			if (err)
				res.status(400).send(err)
			else
				cb(data)
		})
	}
	next()
}


function validateScheme(data, scheme, cb) {
	var outData = {}

	var valid = true
	for (key in scheme) {
		if (typeof(scheme[key]) == 'string') {
			switch (scheme[key]) {
			case 'string':
				valid = (typeof(data[key]) == 'string')
				break
			case 'array':
				valid = (Array.isArray(data[key]))
				break
			default:
				valid = false
			}
		} else {
			valid = false
		}

		if (!valid) {
			cb('Bad or missing parameter: '+key)
			return
		} else
			outData[key] = data[key]
	}

	cb(null, outData)
}
