import fs from 'fs';
import path from 'path';

const filePath = path.resolve('./userdb.json');

function readUserDB() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
  }
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

function writeUserDB(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'error', message: 'Method not allowed' });
  }

  const { Username, Password } = req.body;

  if (!Username || !Password) {
    return res.status(400).json({ status: 'error', message: 'Missing credentials' });
  }

  try {
    let users = readUserDB();

    const userExists = users.find(u => u.Username === Username);

    if (userExists) {
      if (userExists.Password === Password) {
        return res.status(200).json({ status: 'allowed' });
      } else {
        return res.status(403).json({ status: 'error', message: 'Invalid password' });
      }
    }

    // Add new user
    users.push({ Username, Password });
    writeUserDB(users);

    return res.status(200).json({ status: 'allowed', message: 'User added and allowed' });

  } catch (error) {
    return res.status(500).json({ status: 'error', message: 'Server error' });
  }
}
