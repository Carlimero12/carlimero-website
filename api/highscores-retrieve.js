// File: /api/highscores-retrieve.js

import fs from 'fs/promises';
const filePath = '/tmp/highscores.json';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ status: 'error', message: 'Only GET allowed' });
  }

  try {
    const file = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(file);
    return res.status(200).json({ status: 'success', data });
  } catch {
    return res.status(200).json({ status: 'success', data: [] });
  }
}
