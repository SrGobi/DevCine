const API = "https://api-dev-cine.vercel.app/api/v1";

document.addEventListener("DOMContentLoaded", async () => {
  const moviesContainer = document.getElementById("movies-container");

  try {
    // Obtener las películas actualizadas del servidor
    const response = await fetch(`${API}/movies`);
    const movies = await response.json();

    // Ordenar las películas por fecha de actualización de forma descendente
    const sortedMovies = movies.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    // Obtener las últimas 36 películas
    const latestMovies = sortedMovies.slice(0, 36);

    // Mostrar las películas en el contenedor
    latestMovies.forEach((movie) => {
      const movieCard = createMovieCard(movie);
      moviesContainer.appendChild(movieCard);
    });
  } catch (error) {
    console.error("Error al obtener las películas actualizadas:", error);
  }
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
  year.textContent = `Año: ${movie.year}`;
  movieCard.appendChild(year);

  const quality = document.createElement("p");
  quality.textContent = `Calidad: ${movie.quality}`;
  movieCard.appendChild(quality);

  return movieCard;
}