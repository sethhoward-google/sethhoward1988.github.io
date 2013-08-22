$(function(){
	var pageTitles = $('.nav.navbar-nav li')
	var pageTitle = document.title
	_.each(pageTitles, function (li) {
		if($(li).attr('data-page-title') == pageTitle){
			$(li).find('a').addClass('active')
		}
	})
})