import fs from 'fs/promises';
import path from 'path';

const HIGHSCORES_FILE = '/tmp/highscores.json'; // Use /tmp for serverless writable dir

// Helper to load highscores from file or return empty object
async function loadHighscores() {
  try {
    const data = await fs.readFile(HIGHSCORES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return {};
  }
}

// Helper to save highscores object to file
async function saveHighscores(highscores) {
  await fs.writeFile(HIGHSCORES_FILE, JSON.stringify(highscores, null, 2), 'utf-8');
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { Username, Highscore } = req.body;

    if (!Username || Highscore === undefined) {
      return res.status(400).json({ status: 'error', message: 'Missing Username or Highscore' });
    }

    try {
      const highscores = await loadHighscores();

      // Update only if new score is higher
      if (!highscores[Username] || Highscore > highscores[Username]) {
        highscores[Username] = Highscore;
        await saveHighscores(highscores);
      }

      return res.status(200).json({ status: 'success', message: 'Highscore saved', highscores });
    } catch (err) {
      console.error('Failed to save highscore:', err);
      return res.status(500).json({ status: 'error', message: 'Failed to save highscore' });
    }
  } else if (req.method === 'GET') {
    // Return all highscores
    try {
      const highscores = await loadHighscores();
      return res.status(200).json({ status: 'success', highscores });
    } catch (err) {
      return res.status(500).json({ status: 'error', message: 'Failed to load highscores' });
    }
  } else {
    return res.status(405).json({ status: 'error', message: 'Method not allowed' });
  }
}
