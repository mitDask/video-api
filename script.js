const API_KEY = "api_key=cfbb1ec918f017a97067d4dfdc04996b";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500/";
const searchField = document.querySelector(".searchbar");
const SEARCH_URL = BASE_URL + "/search/movie?" + API_KEY + "&query=";
const searchForm = document.querySelector(".searchFormm");
const main = document.querySelector("main");
const released = document.getElementById("rd");
const selected = document.querySelector(".optional");

/////// DOCUMENTS//////
// to check at console type .results
// to get an imgg, type "https://image.tmdb.org/t/p/w500"
// to search example url https://api.themoviedb.org/3/search/movie?api_key={api_key}&query=Jack+Reacher
//primary_release_date.gte

// 1) fetching url

// Calling it to NOT have a null page
getMovies(API_URL);

// const movs = { id: "", title: "", vote_average: [], release_date: [] };
let movs = [];
released.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("hh");
});

function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      viewMovs(data.results);
    });
}

//2) movies view
function viewMovs(data) {
  main.innerHTML = "";

  data.forEach((movies) => {
    const { title, poster_path, vote_average, overview, id, release_date } =
      movies;

    movs.push(
      movies.release_date,
      movies.title,
      movies.id,
      movies.vote_average
    );

    const moviesEl = document.createElement("div");
    moviesEl.classList.add("movies");
    moviesEl.innerHTML = ` 
      <div class="movie-img"><img  class="movie-img" src="${
        IMG_URL + poster_path
      }" alt="${title}"/></div>
      <div class="minfo">${title}</div>
      <div class="rting">${vote_average}</div>

      <div class="about"></div>
      <p class="overview">${overview}</p>
    `;

    main.appendChild(moviesEl);
  });
}

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const searching = searchField.value;
  if (searching) {
    console.log(searching);
    const addMe = getMovies(SEARCH_URL + searching);
    setTimeout(movs.push(addMe), console.log(movs), 4000);
  }
});
