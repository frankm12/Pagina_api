async function buscarMoneda() {
  const query = document.getElementById("searchInput").value;
  const resultadoDiv = document.getElementById("resultado");

  if (!query.trim()) {
    resultadoDiv.innerHTML = "<p>Por favor, escribe algo para buscar.</p>";
    resultadoDiv.classList.remove("fade-in"); // Por si tenía la clase antes
    return;
  }

  // Mostrar spinner
  resultadoDiv.classList.remove("fade-in");
  resultadoDiv.innerHTML = `<div class="spinner"></div>`;

  try {
    const response = await fetch(`https://api.coingecko.com/api/v3/search?query=${query}`);
    const data = await response.json();

    if (data.coins.length === 0) {
      resultadoDiv.innerHTML = "<p>No se encontraron resultados.</p>";
      return;
    }

    let html = "<h2>Resultados:</h2><ul>";
    data.coins.forEach(moneda => {
      html += `<li><strong>${moneda.name}</strong> (${moneda.symbol})</li>`;
    });
    html += "</ul>";

    resultadoDiv.innerHTML = html;
    resultadoDiv.classList.add("fade-in");
  } catch (error) {
    resultadoDiv.innerHTML = "<p>Ocurrió un error al buscar los datos.</p>";
    console.error(error);
  }
}

document.getElementById("searchInput").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    buscarMoneda();
  }
});

