const API = "https://api-dev-cine.vercel.app/api/v1"
document.addEventListener("DOMContentLoaded", async () => {
  const moviesContainer = document.getElementById("movies-container");

  // Obtener películas del servidor
  const response = await fetch(`${API}/movies`);
  const movies = await response.json();

  // Mostrar las películas en el contenedor
  movies.forEach((movie) => {
    const movieCard = createMovieCard(movie);
    moviesContainer.appendChild(movieCard);
  });
});

function createMovieCard(movie) {
  const movieCard = document.createElement("div");
  movieCard.classList.add("movie-card");

  const image = document.createElement("img");
  image.src = movie.img;
  image.alt = movie.title;
  movieCard.appendChild(image);

  const title = document.createElement("h2");
  title.textContent = movie.title;
  movieCard.appendChild(title);

  const year = document.createElement("p");
  year.textContent = `Year: ${movie.year}`;
  movieCard.appendChild(year);

  const genre = document.createElement("p");
  genre.textContent = `Genre: ${movie.genre}`;
  movieCard.appendChild(genre);

  // Agregar un enlace al detalle de la película
  const detailsLink = document.createElement("a");
  detailsLink.href = `src/movie/movie.html?id=${movie._id}`;
  detailsLink.textContent = "Ver detalles";
  movieCard.appendChild(detailsLink);

  return movieCard;
}