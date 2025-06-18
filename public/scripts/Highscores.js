document.addEventListener("DOMContentLoaded", () => {
    const highscores = [
        { name: "PlayerOne", score: 8420 },
        { name: "LunaFox", score: 7990 },
        { name: "NeoShadow", score: 7100 },
        { name: "Max", score: 6555 },
        { name: "AI_Bot", score: 6400 },
        { name: "Ghost", score: 5000 }
    ];

    const tbody = document.getElementById("score-body");
    highscores.forEach((entry, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}.</td>
            <td>${entry.name}</td>
            <td>${entry.score}</td>
        `;
        tbody.appendChild(row);
    });
});
