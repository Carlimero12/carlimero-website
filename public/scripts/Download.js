// Download.js
document.addEventListener("DOMContentLoaded", () => {
  const installerBtn = document.getElementById("download-installer");
  const gameBtn = document.getElementById("download-game");
  const installerCountElem = document.getElementById("installer-count");
  const gameCountElem = document.getElementById("game-count");

  // Funktion, um aktuelle Download-Zähler vom Server zu holen
  function updateDownloadCounts() {
    fetch("/api/downloads")
      .then((res) => res.json())
      .then((data) => {
        const installer = data.find((d) => d.name === "installer")?.count || 0;
        const game = data.find((d) => d.name === "game")?.count || 0;

        installerCountElem.textContent = installer;
        gameCountElem.textContent = game;
      })
      .catch((err) => {
        console.error("Fehler beim Laden der Download-Zähler:", err);
      });
  }

  // Zähler erhöhen beim Klick
  function incrementDownload(type) {
    fetch(`/api/download/${type}`, { method: "POST" }).catch((err) => {
      console.error(`Fehler beim Erhöhen des Zählers für ${type}:`, err);
    });
  }

  installerBtn.addEventListener("click", () => {
    incrementDownload("installer");
  });

  gameBtn.addEventListener("click", () => {
    incrementDownload("game");
  });

  // Update initial und alle 10 Sekunden
  updateDownloadCounts();
  setInterval(updateDownloadCounts, 10000);
});
