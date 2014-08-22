var Rx = require('rx') && require('rxjs-fs'),
	closed = require('./http/request-closed'),
	contentTypes = {
		'.jpg': 'image/jpeg',
		'.png': 'image/png',
		'.js':  'text/javascript',
		'.css': 'text/css'
	},
	encodings = {
		'.jpg': 'binary',
		'.png': 'binary'
	};

module.exports = function(data) {
	
	var url = data.request.url,
		extension = url.substring(url.lastIndexOf('.')),
		contentType = contentTypes[extension] || 'text/plain',
		encoding = encodings[extension] || 'utf-8';
	
	return Rx.fs
		.readfile('.' + url, encoding)
		.select(function(x) {
			
			data.result = x.file;
			data.contentType = contentType;
			data.encoding = encoding;
			
			return data;
		})
		.take(1)
		// Close the stream if the request is closed.
		.takeUntil(closed(data));
}
