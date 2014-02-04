
var App = function () {
    // Constructor
    this.init();

}

App.prototype = {

    init: function () {
        // Create container element
        this.el = document.createElement('div');
        this.el.className = 'app';

        // Create search bar
        this.searchBar = document.createElement('input')
        this.searchBar.type = 'text';
        this.searchBar.placeholder = "search for movies..."

        // Create results container
        this.results = document.createElement('div');
        this.results.className = 'results';

        // Append search bar to container
        this.el.appendChild(this.searchBar);

        // Append results container to app container
        this.el.appendChild(this.results);

        this.util = new Utility;

        this.setListeners()

    },

    setListeners: function () {
        this.onKeyupSearchBar = this.util.bind(this.onKeyupSearchBar, this);
        this.onSearchSuccess = this.util.bind(this.onSearchSuccess, this);
        this.searchBar.onkeyup = this.onKeyupSearchBar;
    },

    onKeyupSearchBar: function (evt) {
        if(evt.keyCode == 13) {
            var baseUrl = 'http://api.rottentomatoes.com/api/public/v1.0/movies.json'
            var term = '?q=' + evt.target.value;
            var key = '&apikey=kej36g99ry7adxc2f37g7tqq';
            this.util.jsonp(baseUrl + term + key, this.onSearchSuccess);
        }
    },

    onSearchSuccess: function (data) {
        this.results.innerHTML = '';

        var movies = data.movies;

        for(var i = 0, len = movies.length; i < len; i++){
            this.results.appendChild(this.createMovieHTML(movies[i]));
        }

    },

    createMovieHTML: function (movie) {
        var container = document.createElement('div')
        container.className = 'movie';

        var header = document.createElement('h1');
        header.innerText = movie.title + ' - ' + movie.mpaa_rating;
        var image = document.createElement('img');
        image.src = '/notAvailable.png';
        if(movie.posters){
            if(movie.posters.original){
                image.src = movie.posters.original;        
            }
        }
        var synopsis = document.createElement('p')
        synopsis.innerText = movie.synopsis;

        container.appendChild(header)
        container.appendChild(image)
        container.appendChild(synopsis);
        
        return container;
    }

}
