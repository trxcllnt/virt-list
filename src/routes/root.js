var Rx     = require('rx') && require('rxjs-fs'),
	build  = require('../../bin/build'),
	closed = require('./http/request-closed'),
	haml   = require('hamljs');

module.exports = function(debugMode) {
	
	var isDebugMode = K(debugMode);
	
	return function(data) {
		
		return Rx.fs.readfile('./src/index.haml')
			.select(function(x) {
				return haml.render(x.file);
			})
			// Assign the index html to each request's 'result'.
			.select(function(x) {
				data.result = x;
				data.contentType = 'text/html';
				return data;
			})
			.flatMap(function(data) {
				
				var building = build(debugMode),
					noop = Rx.Observable.empty();
				
				// If in debug mode, build the JS source.
				// Otherwise, immediately complete.
				return Rx.Observable
					.if(isDebugMode, building, noop)
					// Ignore the compilation result.
					.ignoreElements()
					// When the compile/noop is complete,
					// emit the data value.
					.concat(Rx.Observable.returnValue(data))
			})
			// Complete after a single value is emitted to avoid memory leaks.
			.take(1)
			// Stop compiling and close the stream if the
			// request is closed before compiling finishes.
			.takeUntil(closed(data));
	}
}

// Constant
function K(value) {
	return function() {
		return value;
	}
}
