import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Open (or create) the SQLite database
async function openDb() {
  return open({
    filename: './users.db',
    driver: sqlite3.Database,
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'error', message: 'Method not allowed' });
  }

  const { Username, Password } = req.body;

  if (!Username || !Password) {
    return res.status(400).json({ status: 'error', message: 'Missing Username or Password' });
  }

  try {
    const db = await openDb();

    // Create users table if it doesn't exist
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
      )
    `);

    // Check if user exists
    const user = await db.get('SELECT * FROM users WHERE username = ?', Username);

    if (user) {
      // User exists - check password
      if (user.password === Password) {
        return res.status(200).json({ status: 'allowed' });
      } else {
        return res.status(403).json({ status: 'error', message: 'Incorrect password' });
      }
    }

    // User doesn't exist - create new user
    await db.run('INSERT INTO users (username, password) VALUES (?, ?)', Username, Password);

    return res.status(200).json({ status: 'allowed', message: 'User created and allowed' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: 'error', message: 'Database error' });
  }
}
