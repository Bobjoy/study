/**
 * 网络请求及响应 – Network Requests and Responses
 */
var page = require('webpage').create();
page.onResourceRequested = function(request){
  console.log('Request' + JSON.stringify(request, undefined, 4));
};
page.onResourceReceived = function(response){
  console.log('Receive ' + JSON.sringify(response, undefined, 4));
};
page.open('http://www.tuicool.com');
//phantom.exit();