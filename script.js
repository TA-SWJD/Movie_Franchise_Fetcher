const button = document.getElementById("get");
let remover = [];
button.addEventListener("click", function (event) {
  event.preventDefault(); 
  for (let i of remover){
    i.remove();
  }
  var name = document.getElementById("movie");
  if (name.value == "None") {
    return;
  };

  let response = axios.get("https://api.themoviedb.org/3/search/movie", {
    params: {
      api_key: "d2efec38e7d74d12122672897f241cbf",
      include_adult: "false",
      query: name.value,
    }
  });

  response = response.then((moviesData) => {
    for (let movie of moviesData.data.results) {   
      axios.get(`https://api.themoviedb.org/3/movie/${movie.id}`, {
        params: {
          api_key: "d2efec38e7d74d12122672897f241cbf",
          append_to_response: "videos",
        }
      }).then((movieData) => {
        const img = document.createElement('img');
        const p = document.createElement('p');
        const iframe = document.createElement('iframe');
        console.log(movie);
        remover.push(p, img, iframe);
        const trailers = movieData.data.videos.results.filter((trailer) => trailer.type === "Trailer");
        iframe.src = `https://www.youtube.com/embed/${trailers.at(0).key}`
        img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        p.classList.add("title");
        p.innerHTML = `Title: ${movie.title} <br> Release Date: ${movie.release_date} &nbsp Popularity: ${movie.popularity}
        <br> Language: ${movie.original_language} &nbsp Vote: ${movie.vote_count} &nbsp Vote Average: ${movie.vote_average}
        <br> Violence: ${movie.adult} &nbsp Intensive Language: ${movie.adult}
        <br> Overview: ${movie.overview}
        <br> ID: ${movie.id} &nbsp Backdrop Path: ${movie.backdrop_path} &nbsp Poster Path: ${movie.poster_path}`;
        document.body.append(p);
        document.body.append(img);
        document.body.append(iframe);
      });
    }
  });
});
