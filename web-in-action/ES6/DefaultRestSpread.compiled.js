"use strict";

function f(x) {
	var y = arguments.length <= 1 || arguments[1] === undefined ? 12 : arguments[1];

	// y is 12 if not passed (or passed as undefined)
	return x + y;
}
f(3) == 15;

function f(x) {
	for (var _len = arguments.length, y = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		y[_key - 1] = arguments[_key];
	}

	// y is an Array
	return x * y.length;
}
f(3, "hello", true) == 6;

function f(x, y, z) {
	return x + y + z;
}
f.apply(undefined, [1, 2, 3]) == 6;
