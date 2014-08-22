var Rx = require('rx');

// Creates an Observable that listens for
// the 'closed' event on an http.IncomingMessage
module.exports = function(data) {
	return Rx.Observable.fromEvent(data.request, 'closed');
}
