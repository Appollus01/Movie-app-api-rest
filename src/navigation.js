
let maxPage;
let page = 1;
let infiniteScroll;

searchFormBtn.addEventListener('click', () => {
    searchFormInput.value;
    location.hash = '#search='+ searchFormInput.value;
});
trendingBtn.addEventListener('click', () => location.hash = '#trends');
arrowBtn.addEventListener('click', () => history.back() );

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);
window.addEventListener('scroll', infiniteScroll, false);


function navigator() {

    if (infiniteScroll) {
        window.removeEventListener('scroll', infiniteScroll, {passive: false});
        infiniteScroll = undefined;
    }

    if(location.hash.startsWith('#trends')){
        trendPage();
    } else if (location.hash.startsWith('#search=')) {
        searchPage();
    } else if (location.hash.startsWith('#movie=')) {
        movieDetailPage();
    } else if (location.hash.startsWith('#category=')) {
        categoryPage();
    } else {
        homePage();
    }
    document.body.scrollTop = 0;
    //document.documentElements.scrollTop = 0;

    if(infiniteScroll) {
        window.addEventListener('scroll', infiniteScroll, {passive: false})
    }
}

function homePage() {
    console.log('home page');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    likedMoviesSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

    getTrendingMoviesPreview();
    getCategoriesMoviesPreview();
    getLikedMovies();

    searchFormInput.value = '';
}

function categoryPage() {
    console.log('category page');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    likedMoviesSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [_, categoryData] = location.hash.split('=');
    const [categoryId, categoryName]= categoryData.split('-');

    headerCategoryTitle.innerHTML = categoryName;

    getMoviesByCategory(categoryId);

    infiniteScroll = getPaginatedMoviesByCategory(categoryId);
}

function movieDetailPage() {
    console.log('movie page');

    headerSection.classList.add('header-container--long');
    //headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    likedMoviesSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');

    const [_, movieId] = location.hash.split('=');

    getMovieById(movieId);

}

function searchPage() {
    console.log('search page');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    likedMoviesSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [_, query] = location.hash.split('=');
    
    getMoviesBySearch(query);

    infiniteScroll = getPaginatedMoviesBySearch(query);
}

function trendPage() {
    console.log('tends page');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    likedMoviesSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    headerCategoryTitle.innerHTML = 'Tendencias';

    getTrendingMovies();

    infiniteScroll = getPaginatedTrendingMovies;
}