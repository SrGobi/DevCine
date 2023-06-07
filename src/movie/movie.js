const API = "https://api-dev-cine.vercel.app/api/v1";

document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get("id");

  if (movieId) {
    const response = await fetch(`${API}/movie/${movieId}`);
    const movie = await response.json();

    const movieDetailsContainer = document.getElementById("movie-details-container");
    movieDetailsContainer.appendChild(createMovieDetailsHTML(movie));
  }
});

function createMovieDetailsHTML(movie) {
  const movieDetails = document.createElement("div");
  movieDetails.classList.add("movie-details");

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

  const { "1080p": links1080p, "4k": links4k } = movie.links;

  if (links1080p && links1080p.length > 0) {
    const links1080pContainer = document.createElement("div");
    links1080pContainer.classList.add("links1080p-container");

    const links1080pTitle = document.createElement("h3");
    links1080pTitle.textContent = "1080p Links";
    links1080pContainer.appendChild(links1080pTitle);

    links1080p.forEach((link) => {
      const torrentLink = createTorrentLink(link);
      links1080pContainer.appendChild(torrentLink);
    });

    linksContainer.appendChild(links1080pContainer);
  }

  if (links4k && links4k.length > 0) {
    const links4kContainer = document.createElement("div");
    links4kContainer.classList.add("links4k-container");

    const links4kTitle = document.createElement("h3");
    links4kTitle.textContent = "4k Links";
    links4kContainer.appendChild(links4kTitle);

    links4k.forEach((link) => {
      const torrentLink = createTorrentLink(link);
      links4kContainer.appendChild(torrentLink);
    });

    linksContainer.appendChild(links4kContainer);
  }

  movieDetails.appendChild(linksContainer);

  return movieDetails;
}

function createTorrentLink(link) {
  const torrentLink = document.createElement("a");
  torrentLink.href = link;
  torrentLink.target = "_blank";
  torrentLink.classList.add("torrent-link");

  const button = document.createElement("button");
  button.classList.add("torrent-button");
  button.textContent = "TORRENT";

  torrentLink.appendChild(button);

  return torrentLink;
}