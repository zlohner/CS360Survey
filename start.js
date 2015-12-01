var static = require('node-static')
static = new static.Server()


require('http').createServer(function(request, response) {
	response.writeHead(200)
	response.write('Hello, world!')
	response.end()
}).listen(80)