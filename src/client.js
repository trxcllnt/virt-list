var $  = require('jquery'),
	_  = require('lodash'),
	Ix = require('ix'),
	Rx = require('rx');

window.$  = $;
window._  = _;
window.Rx = Rx;
window.Ix = Ix;

require('main')($('body'));