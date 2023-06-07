const API = "https://api-dev-cine.vercel.app/api/v1";
document.addEventListener("DOMContentLoaded", async () => {
  const estrenoContainer = document.getElementById("estreno-container");

  // Obtener las películas de estreno del último año
  const response = await fetch(`${API}/movies`);
  const movies = await response.json();

  // Filtrar las primeras 36 películas del último año
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  console.log("Año actual:", currentYear);
  const filteredMovies = movies.filter((movie) => {
    const movieYear = new Date(movie.releaseDate).getFullYear();
    return movieYear === currentYear;
  }).slice(0, 36);
  console.log("Películas filtradas:", filteredMovies);

  // Mostrar las películas en el collage
  filteredMovies.forEach((movie) => {
    const movieCard = createMovieCard(movie);
    estrenoContainer.appendChild(movieCard);
  });
  console.log("Películas mostradas:", filteredMovies.length);
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
  year.textContent = `Year: ${new Date(movie.releaseDate).getFullYear()}`;
  movieCard.appendChild(year);

  const quality = document.createElement("p");
  quality.textContent = `Quality: ${movie.quality}`;
  movieCard.appendChild(quality);

  return movieCard;
}
