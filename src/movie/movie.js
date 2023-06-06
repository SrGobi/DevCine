const API = "https://api-dev-cine.vercel.app/api/v1"
document.addEventListener("DOMContentLoaded", async () => {
  // Obtener el ID de la película de la URL actual
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get("id");

  // Verificar si se proporcionó un ID de película válido
  if (movieId) {
    // Obtener los detalles de la película desde el servidor
    const response = await fetch(`${API}/movie/${movieId}`);
    const movie = await response.json();

    // Mostrar los detalles de la película en el contenedor
    const movieDetailsContainer = document.getElementById("movie-details-container");
    movieDetailsContainer.appendChild(createMovieDetailsHTML(movie));
  } else {
    // Mostrar un botón de prueba para volver a la página principal
    const backButtonContainer = document.getElementById("back-button-container");

    const backButton = document.createElement("button");
    backButton.textContent = "Back to Home";
    backButton.addEventListener("click", () => {
      window.location.href = "index.html";
    });

    backButtonContainer.appendChild(backButton);
  }
});

function createMovieDetailsHTML(movie) {
  const movieDetails = document.createElement("div");
  movieDetails.classList.add("movie-details");

  const backButton = document.createElement("button");
  backButton.textContent = "Back to Home";
  backButton.addEventListener("click", () => {
    window.location.href = "index.html";
  });
  movieDetails.appendChild(backButton);

  const image = document.createElement("img");
  image.src = movie.img;
  image.alt = movie.title;
  movieDetails.appendChild(image);

  const title = document.createElement("h2");
  title.textContent = movie.title;
  movieDetails.appendChild(title);

  const year = document.createElement("p");
  year.textContent = `Year: ${movie.year}`;
  movieDetails.appendChild(year);

  const genre = document.createElement("p");
  genre.textContent = `Genre: ${movie.genre}`;
  movieDetails.appendChild(genre);

  const linksContainer = document.createElement("div");
  linksContainer.classList.add("links-container");

  movie.links.forEach((link) => {
    const torrentLink = document.createElement("a");
    torrentLink.href = link;
    torrentLink.target = "_blank";
    torrentLink.classList.add("torrent-link");

    const button = document.createElement("button");
    button.classList.add("torrent-button");
    button.textContent = "TORRENT";

    torrentLink.appendChild(button);
    linksContainer.appendChild(torrentLink);
  });

  movieDetails.appendChild(linksContainer);

  return movieDetails;
}