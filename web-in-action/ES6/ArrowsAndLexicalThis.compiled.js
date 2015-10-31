// Expression bodies
"use strict";

var evens = [0, 2, 4, 6, 8];
var odds = evens.map(function (v) {
	return v + 1;
});
var nums = evens.map(function (v, i) {
	return v + i;
});

// Statement bodies
var fives = [];
nums.forEach(function (v) {
	if (v % 5 === 0) fives.push(v);
});
