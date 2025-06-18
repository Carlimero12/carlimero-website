document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("/api/highscores-retrieve");
        const result = await response.json();

        const highscores = result.data || [];

        const tbody = document.getElementById("score-body");
        highscores.forEach((entry, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}.</td>
                <td>${entry.username}</td>
                <td>${entry.highscore}</td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error("Fehler beim Laden der Highscores:", error);
        const tbody = document.getElementById("score-body");
        tbody.innerHTML = `<tr><td colspan="3">Fehler beim Laden der Daten</td></tr>`;
    }
});
