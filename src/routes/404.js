var Rx = require('rx');

module.exports = function(data) {
	
	data.result = '404';
	data.response.writeHead(404, {
		"Content-Type": "text/plain",
		"Content-Length": 3
	});
	
	return Rx.Observable.returnValue(data);
}