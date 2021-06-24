// vanilla javascript

// METODE FETCH
// const searchButton = document.querySelector('.search-button');
// searchButton.addEventListener('click', function () {
//   const inputKeywords = document.querySelector('.input-keywords');
//   fetch('http://www.omdbapi.com/?apikey=39229bd1&s=' + inputKeywords.value)
//     .then((response) => response.json())
//     .then((response) => {
//       const movies = response.Search;
//       let cards = '';
//       movies.forEach((movie) => (cards += showCards(movie)));
//       const movieContainer = document.querySelector('.movie-container');
//       movieContainer.innerHTML = cards;

//       const modalDetailButton = document.querySelectorAll(
//         '.modal-detail-button'
//       );
//       modalDetailButton.forEach((btn) => {
//         btn.addEventListener('click', function () {
//           console.log(this);
//           const imdbid = this.dataset.imdbid;
//           fetch('http://www.omdbapi.com/?apikey=39229bd1&i=' + imdbid)
//             .then((response) => response.json())
//             .then((movie) => {
//               const movieDetail = showMovieDetails(movie);
//               const modalBody = document.querySelector('.modal-body');
//               modalBody.innerHTML = movieDetail;
//             });
//         });
//       });
//     });
// });

// tampilan film awal
window.addEventListener('load', function () {
    fetch('http://www.omdbapi.com/?apikey=39229bd1&s=transformers')
        .then((response) => response.json())
        .then((response) => {
            const movies = response.Search;
            getCards(movies);
        });
});

// METODE ASYNC AWAIT
const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', async function () {
    try {
        const inputKeywords = document.querySelector('.input-keywords');
        const movies = await getMovies(inputKeywords.value);
        getCards(movies);
    } catch (err) {
        alert('NOT FOUND !');
    }
});

document.addEventListener('click', async function (e) {
    if (e.target.classList.contains('modal-detail-button')) {
        const imdbid = e.target.dataset.imdbid;
        const movieDetail = await getMovieDetails(imdbid);
        modalDetails(movieDetail);
    }
});

// kumpulan fungsi
function getMovies(keywords) {
    return fetch('http://www.omdbapi.com/?apikey=39229bd1&s=' + keywords)
        .then((response) => response.json())
        .then((response) => response.Search);
}

function getCards(movies) {
    let cards = '';
    movies.forEach((movie) => (cards += showCards(movie)));
    const movieContainer = document.querySelector('.movie-container');
    movieContainer.innerHTML = cards;
}

function getMovieDetails(imdbid) {
    return fetch('http://www.omdbapi.com/?apikey=39229bd1&i=' + imdbid)
        .then((response) => response.json())
        .then((movie) => movie);
}

function modalDetails(movie) {
    const movieDetail = showMovieDetails(movie);
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = movieDetail;
}

function showCards(movie) {
    return `<div class="col-6 col-sm-4">
                <div class="card mb-5">
                    <img class="card-img-top" src="${movie.Poster}" style="height: 400px;"/>
                    <div class="card-body">
                        <h5 class="card-title">${movie.Title} (${movie.Year})</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${movie.Year}</h6>
                        <a href="#" class="btn btn-dark modal-detail-button" data-toggle="modal"
                        data-target="#exampleModal" data-imdbid="${movie.imdbID}">Details</a>
                    </div>
                </div>
            </div>`;
}

function showMovieDetails(movie) {
    return `<div class="container-fluid">
                <div class="row">
                    <div class="col">
                        <img src="${movie.Poster}" style="width: 100%;" />
                        <ul class="list-group">
                            <li class="list-group-item"><h4>${movie.Title}</h4></li>
                            <li class="list-group-item"><strong>Genre : </strong>${movie.Genre}</li>
                            <li class="list-group-item"><strong>Date release : </strong>${movie.Released}</li>
                            <li class="list-group-item"><strong>Director : </strong>${movie.Director}</li>
                            <li class="list-group-item"><strong>Actors : </strong>${movie.Actors}</li>
                            <li class="list-group-item"><strong>Writers : </strong>${movie.Writer}</li>
                            <li class="list-group-item"><strong>Plot : </strong> <br> ${movie.Plot}</li>
                        </ul>
                    </div>
                </div>
            </div>`;
}
