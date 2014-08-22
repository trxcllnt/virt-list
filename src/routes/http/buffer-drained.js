var Rx = require('rx');

// Creates an Observable that listens for
// the 'drain' event on an http.ServerResponse
module.exports = function(data) {
	return Rx.Observable.fromEvent(data.response, 'drain');
}