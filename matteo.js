const apiKey = "TUA_API_KEY"; // Sostituisci con la tua vera chiave

async function searchMovie() {
  const title = document.getElementById("searchInput").value.trim();
  const resultDiv = document.getElementById("movie");

  if (!title) {
    resultDiv.innerHTML = "<p>Inserisci un titolo.</p>";
    return;
  }

  const url = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(title)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === "False") {
      resultDiv.innerHTML = `<p>Film non trovato: ${data.Error}</p>`;
      return;
    }

    resultDiv.innerHTML = `
      <h2>${data.Title} (${data.Year})</h2>
      <p><strong>Genere:</strong> ${data.Genre}</p>
      <p><strong>Regista:</strong> ${data.Director}</p>
      <p><strong>Trama:</strong> ${data.Plot}</p>
      <img src="${data.Poster !== "N/A" ? data.Poster : ""}" alt="Poster del film">
    `;
  } catch (error) {
    console.error("Errore nella richiesta:", error);
    resultDiv.innerHTML = "<p>Errore nella richiesta. Riprova più tardi.</p>";
  }
}
