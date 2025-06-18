const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

// Datenbank initialisieren
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS downloads (
      name TEXT PRIMARY KEY,
      count INTEGER NOT NULL DEFAULT 0
    )
  `);

  const stmt = db.prepare("INSERT OR IGNORE INTO downloads (name, count) VALUES (?, ?)");
  stmt.run("installer", 0);
  stmt.run("game", 0);
  stmt.finalize();
});

// API: Hole aktuellen Zähler
app.get('/api/downloads', (req, res) => {
  db.all(`SELECT * FROM downloads`, (err, rows) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).send('DB Error');
    }
    res.json(rows);
  });
});

// API: Zähler erhöhen
app.post('/api/download/:type', (req, res) => {
  const type = req.params.type;
  if (!['installer', 'game'].includes(type)) {
    return res.status(400).send('Invalid type');
  }
  
  db.run(`UPDATE downloads SET count = count + 1 WHERE name = ?`, [type], function(err) {
    if (err) {
      console.error("DB Write Error:", err);
      return res.status(500).send('DB Write Error');
    }
    res.sendStatus(200);
  });
});

// Weiterleitungen
app.get("/Highscore", (req, res) => {
  res.redirect("/Highscores.html");
});

app.get("/Download", (req, res) => {
  res.redirect("/Download.html"); // nur eine Weiterleitung verwenden
});

app.get("/about", (req, res) => {
  res.redirect("/about.html"); // nur eine Weiterleitung verwenden
});

app.listen(PORT, () => {
  console.log(`✅ Server läuft auf http://localhost:${PORT}`);
});
