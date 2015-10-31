// Basic literal string creation
"use strict";

var _templateObject = _taggedTemplateLiteral(["In ES5 \"\n\" is a line-feed."], ["In ES5 \"\\n\" is a line-feed."]),
    _templateObject2 = _taggedTemplateLiteral(["http://foo.org/bar?a=", "&b=", "\n\t\tContent-Type: application/json\n\t\tX-Credentials: ", "\n\t\t{ \"foo\": ", ",\n\t\t\t\"bar\": ", "}"], ["http://foo.org/bar?a=", "&b=", "\n\t\tContent-Type: application/json\n\t\tX-Credentials: ", "\n\t\t{ \"foo\": ", ",\n\t\t\t\"bar\": ", "}"]);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var a = "This is a pretty little template string.";

// Multiline strings
var b = "In ES5 this is\nnot legal.";

// Interpolate variable bindings
var name = "Bob",
    time = "today";
var foo = "Hello " + name + ", how are you " + time + "?";

// Unescaped template strings
var bar = String.raw(_templateObject);

// Construct an HTTP request prefix is used to interpret the replacements and construction
GET(_templateObject2, a, b, credentials, foo, bar)(myOnReadyStateChangeHandler);
