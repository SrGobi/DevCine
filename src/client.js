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

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("image-container");

  const image = document.createElement("img");
  image.src = movie.img;
  image.alt = movie.title;

  const year = document.createElement("span");
  year.classList.add("year");
  year.textContent = movie.year;

  imageContainer.appendChild(image);
  imageContainer.appendChild(year);
  movieCard.appendChild(imageContainer);

  const title = document.createElement("h2");
  title.textContent = movie.title;
  movieCard.appendChild(title);

  movieCard.addEventListener("click", () => {
    window.location.href = `src/movie/movie.html?id=${movie._id}`;
  });

  return movieCard;
}