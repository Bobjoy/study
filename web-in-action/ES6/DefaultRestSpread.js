function f(x, y = 12) {
	// y is 12 if not passed (or passed as undefined)
	return x + y;
}
f(3) == 15

function f(x, ...y) {
	// y is an Array
	return x * y.length;
}
f(3, "hello", true) == 6;

function f(x, y, z) {
	return x + y + z;
}
f(...[1, 2, 3]) == 6