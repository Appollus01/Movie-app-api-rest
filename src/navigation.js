
window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);


function navigator() {

    if(location.hash.startsWith('#trends')){
        trendPage();
    } else if (location.hash.startsWith('#search=')) {
        searchPage();
    } else if (location.hash.startsWith('#movie=')) {
        moviePage();
    } else if (location.hash.startsWith('#category=')) {
        categoryPage();
    } else {
        homePage();
    }
    location.hash
}

function homePage() {
    console.log('home page');
    getTrendingMoviesPreview();
    getCategoriesMoviesPreview();
}

function categoryPage() {
    console.log('category page');
}

function moviePage() {
    console.log('movie page');
}

function searchPage() {
    console.log('search page');
}

function trendPage() {
    console.log('tends page')
}