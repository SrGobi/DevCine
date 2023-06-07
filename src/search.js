document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const searchResultsContainer = document.getElementById("search-results");

  searchInput.addEventListener("input", async () => {
    const searchTerm = searchInput.value.trim();

    if (searchTerm.length >= 2) {
      const searchResults = await searchMovies(searchTerm);
      displaySearchResults(searchResults);
    } else {
      clearSearchResults();
    }
  });

  async function searchMovies(searchTerm) {
    try {
      const response = await fetch(`${API}/movies`);
      const movies = await response.json();
      const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return filteredMovies;
    } catch (error) {
      console.error("Error al buscar películas:", error);
      return [];
    }
  }

  function displaySearchResults(results) {
    searchResultsContainer.innerHTML = "";

    if (results.length === 0) {
      const noResultsMessage = document.createElement("p");
      noResultsMessage.textContent = "No se encontraron resultados.";
      searchResultsContainer.appendChild(noResultsMessage);
    } else {
      results.forEach((movie) => {
        const resultItem = document.createElement("div");
        resultItem.classList.add("search-result");

        const image = document.createElement("img");
        image.src = movie.img;
        image.alt = movie.title;
        resultItem.appendChild(image);

        const title = document.createElement("h3");
        title.textContent = movie.title;
        resultItem.appendChild(title);

        const year = document.createElement("p");
        year.textContent = `Year: ${movie.year}`;
        resultItem.appendChild(year);

        const genre = document.createElement("p");
        genre.textContent = `Genre: ${movie.genre}`;
        resultItem.appendChild(genre);

        searchResultsContainer.appendChild(resultItem);
      });
    }
  }

  function clearSearchResults() {
    searchResultsContainer.innerHTML = "";
  }
});