var page = require('webpage').create();

page.open('http://docs.slimerjs.org/current/quick-start.html')
    .then(function(status){
      if (status == 'success') {
        console.log('The title of the page is:' + page.title);
      } else {
        console.log('Sorry, the page is not loaded');
      }
      page.close();
      phantom.exit();
    });