$(function(){
	var pageTitles = $('.nav.navbar-nav li')
	var pageTitle = document.title
	_.each(pageTitles, function (li) {
		if($(li).attr('data-page-title') == pageTitle){
			$(li).find('a').addClass('active')
		}
	})
})




// var exampleSocket = new WebSocket("");

var source = new EventSource('http://67.222.234.99:20060/api/subscribe?source=chat&key=abcf219028cde834228888e01d014ae5e5abb12a36c904e78749972cdf17fdca');

// exampleSocket.onmessage = function (event) {
//   console.log(event);
// }


source.addEventListener('message', function(e) {
  console.log(e);
}, false);

source.addEventListener('open', function(e) {
  // Connection was opened.
}, false);

source.addEventListener('error', function(e) {
  if (e.readyState == EventSource.CLOSED) {
    // Connection was closed.
  }
}, false);