"use strict";

const header = document.querySelector(".menus");
const SearchEl = document.getElementById("search");
const form = document.getElementById("form");
const moviesContainer = document.querySelector(".movies-details");
const TvdetailsContainer = document.querySelector(".Tv-details");
const paginationsEl = document.querySelectorAll(".paginations ul li");

// scroll event
window.addEventListener("scroll", () => {
  if (document.documentElement.scrollTop > 20) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
});

// movies
const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=YOUR_API_KEY&page=";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SearchUrl =
  'https://api.themoviedb.org/3/search/movie?api_key=YOUR_API_KEY&query="';

// tv shows API
const API_URL_TV =
  "https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&api_key=YOUR_API_KEY&page=";

const SearchTVUrl =
  'https://api.themoviedb.org/3/search/tv?api_key=YOUR_API_KEY&query="';

// get movies
getMovies(API_URL);
async function getMovies(url) {
  try {
    const result = await fetch(url);
    const data = await result.json();
    console.log(data.results);
    showMovies(data.results);
  } catch (error) {}
}

// search
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const SearchTerm = SearchEl.value;

  if (SearchTerm && SearchTerm !== "") {
    getMovies(SearchUrl + SearchTerm);
    getTvShows(SearchTVUrl + SearchTerm);
    SearchEl.value = "";
  } else {
    window.location.reload();
  }
});

// display movies
function showMovies(movies) {
  moviesContainer.innerHTML = null;
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, release_date } = movie;
    const movieDisplay = document.createElement("div");
    movieDisplay.classList.add("movies");
    movieDisplay.innerHTML = ` <img src="${IMG_PATH + poster_path}" alt="" />
    <div class="des">
      <p class="movie-title">${title}</p>
      <div class="short-des">
        <p class="year">Date: ${release_date}</p>
        <p class="rating">Rating: ${vote_average}</p>
      </div>
    </div>`;
    moviesContainer.appendChild(movieDisplay);
  });
}

//tv shows
getTvShows(API_URL_TV);
async function getTvShows(url) {
  try {
    const result = await fetch(url);
    const data = await result.json();
    console.log(data.results);
    DisplayTvShows(data.results);
  } catch (error) {}
}

function DisplayTvShows(tvShows) {
  TvdetailsContainer.innerHTML = "";
  tvShows.forEach((TvShows) => {
    const { name, poster_path, vote_average, first_air_date } = TvShows;
    const TvShowsDisplay = document.createElement("div");
    TvShowsDisplay.classList.add("tvShows");
    TvShowsDisplay.innerHTML = ` <img src="${IMG_PATH + poster_path}" alt="" />
    <div class="des">
      <p class="movie-title">${name}</p>
      <div class="short-des">
        <p class="year">Date: ${first_air_date}</p>
        <p class="rating">Rating: ${vote_average}</p>
      </div>
    </div>`;
    TvdetailsContainer.appendChild(TvShowsDisplay);
  });
}

// pagination
paginationsEl.forEach((pages, index) => {
  pages.addEventListener("click", () => {
    if (getMovies) {
      getMovies(API_URL + index);
    }
    getTvShows(API_URL_TV + index);
  });
});