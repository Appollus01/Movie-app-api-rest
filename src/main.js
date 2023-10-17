
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params:{
        'api_key': API_KEY,
    },
});

const lazyLoader = new IntersectionObserver( (entries) => {
    entries.forEach((entry)=>{
        if (entry.isIntersecting) {
            const url = entry.target.getAttribute('data-img');
            entry.target.setAttribute('src', url);
        }
        
    });
} );

// helpers

function createMovies(movies, container, {lazyLoad=false, clean = true,} = {},) {

    if (clean) {
        container.innerHTML = '';
    }
    

    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');
        movieContainer.addEventListener('click', () => {
            location.hash = '#movie=' + movie.id ;
        });

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute(
            lazyLoad ? 'data-img' : 'src',
            'https://image.tmdb.org/t/p/w300' + movie.poster_path,);
        
        movieImg.addEventListener('error', () => {
            
            movieImg.setAttribute('src', '../img/image_not_found.png',);
        })
            
        if (lazyLoad) {
            lazyLoader.observe(movieImg);
        }

        movieContainer.appendChild(movieImg);

        container.appendChild(movieContainer);
            
    });
}

function createCategories(categories, container) {
    container.innerHTML = '',

    categories.forEach(category => {
                
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', 'id' + category.id);

        categoryTitle.addEventListener('click', () => {
            location.hash = `#category=${category.id}-${category.name}`;
        })
        const categoryTitleText = document.createTextNode(category.name);

        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);

        container.appendChild(categoryContainer);
            
    });
}

//call to API

async function getTrendingMoviesPreview() {
    const { data } = await api('trending/movie/week');
    
    const movies = data.results;

    createMovies(movies, trendingMoviesPreviewList, {lazyLoad:true, clean:true});

    console.log('trend'+ movies);

}

async function getCategoriesMoviesPreview() {
    const {data} = await api('genre/movie/list');
    
    const categories = data.genres;

    createCategories(categories, categoriesPreviewList);
 
}

async function getMoviesByCategory(id) {
    const { data } = await api('discover/movie', {
        params: {
            with_genres: id,
        },
    });
    
    const movies = data.results;
    maxPage = data.total_pages;

    createMovies(movies, genericSection, {lazyLoad:true, clean:true});

    console.log('category'+ movies);
}

function getPaginatedMoviesByCategory(id) {
    return async function () {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

        const scrollIsBottom = (scrollTop + clientHeight) >= scrollHeight-15;
        const pageIsNotMax = page < maxPage;

        if (scrollIsBottom && pageIsNotMax) {
            page++;
            const { data } = await api('discover/movie', {
                params: {
                    with_genres: id,
                    page,
                },
                
            });
        
            const movies = data.results;

            createMovies(movies, genericSection, {lazyLoad:true, clean:false});

        }
    }
}

async function getMoviesBySearch(query) {
    const { data } = await api('search/movie', {
        params: {
            query,
        },
        
    });
    
    const movies = data.results;
    maxPage = data.total_pages;

    createMovies(movies, genericSection, {lazyLoad:true, clean:true});

    console.log('search'+ maxPage);   
}

function getPaginatedMoviesBySearch(query) {
    return async function () {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

        const scrollIsBottom = (scrollTop + clientHeight) >= scrollHeight-15;
        const pageIsNotMax = page < maxPage;

        if (scrollIsBottom && pageIsNotMax) {
            page++;
            const { data } = await api('search/movie', {
                params: {
                    query,
                    page,
                },
                
            });
        
            const movies = data.results;

            createMovies(movies, genericSection, {lazyLoad:true, clean:false});

        }
    }
}

async function getTrendingMovies() {
    const { data } = await api('trending/movie/week');
    
    const movies = data.results;
    maxPage = data.total_pages;

    createMovies(movies, genericSection, {lazyLoad:true, clean:true});

    console.log('trend'+ movies);

    // const btnLoadMore = document.createElement('button');
    // btnLoadMore.innerText = 'Cargar mas...';
    // btnLoadMore.addEventListener('click', getPaginatedTrendingMovies);
    // genericSection.appendChild(btnLoadMore);

}

async function getPaginatedTrendingMovies() {

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    const scrollIsBottom = (scrollTop + clientHeight) >= scrollHeight-15;
    const pageIsNotMax = page < maxPage;

    if (scrollIsBottom && pageIsNotMax) {
        page++;
        const { data } = await api('trending/movie/week', {
        params: {
            page,
        },
    });
    
    const movies = data.results;

    createMovies(movies, genericSection, {lazyLoad:true, clean:false});

    }
}

async function getMovieById(movieId) {
    const {data: movie} = await api(`movie/${movieId}?language=es`);

    const movieImgUrl = 'https://image.tmdb.org/t/p/w300' + movie.poster_path;
    headerSection.style.background = `
    linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%),
    url(${movieImgUrl})`;
    
    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_average;

    createCategories(movie.genres, movieDetailCategoriesList);

    getRelatedMovieById(movieId);
}

async function getRelatedMovieById(id) {
    const {data} = await api(`movie/${id}/similar`);
    const relatedMovies = data.results;

    createMovies(relatedMovies, relatedMoviesContainer);
}