const API = "https://api-dev-cine.vercel.app/api/v1";

document.addEventListener("DOMContentLoaded", loadEstrenoMovies);

async function loadEstrenoMovies() {
  const estrenoContainer = document.getElementById("estreno-container");

  try {
    // Obtener las películas de estreno del último año
    const response = await fetch(`${API}/movies`);
    const movies = await response.json();

    // Filtrar las primeras 36 películas del último año
    const currentYear = new Date().getFullYear();
    const filteredMovies = movies.filter((movie) => {
      const movieYear = new Date(movie.releaseDate).getFullYear();
      return movieYear === currentYear;
    }).slice(0, 36);

    // Mostrar las películas en el collage
    filteredMovies.forEach((movie) => {
      const movieCard = createMovieCard(movie);
      estrenoContainer.appendChild(movieCard);
    });

    console.log("Películas mostradas:", filteredMovies.length);
  } catch (error) {
    console.error("Error al cargar las películas de estreno:", error);
  }
}

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