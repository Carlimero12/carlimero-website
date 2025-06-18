import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT || 3306,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'error', message: 'Method not allowed' });
  }

  const { Username, Password } = req.body;

  if (!Username || !Password) {
    return res.status(400).json({ status: 'error', message: 'Missing Username or Password' });
  }

  let conn;

  try {
    conn = await mysql.createConnection(dbConfig);

    const [existing] = await conn.execute(
      'SELECT * FROM users WHERE username = ?',
      [Username]
    );

    if (existing.length > 0) {
      const user = existing[0];
      if (user.password === Password) {
        return res.status(200).json({ status: 'allowed' });
      } else {
        return res.status(403).json({ status: 'error', message: 'Wrong password' });
      }
    }

    // User not found → create
    await conn.execute(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [Username, Password]
    );

    return res.status(200).json({ status: 'allowed', message: 'New user added' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: 'error', message: 'Database error' });
  } finally {
    if (conn) await conn.end();
  }
}
