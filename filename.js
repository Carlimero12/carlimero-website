export default function handler(req, res) {
  if (req.method === "POST") {
    const { Username, Password } = req.body;

    if (!Username || !Password) {
      return res.status(400).json({ status: "error", message: "Missing credentials" });
    }

    // Simulate environment check or user DB lookup
    const allowedUsers = process.env.ALLOWED_USERS?.split(",") || [];

    const userExists = allowedUsers.includes(Username);

    if (userExists) {
      return res.status(200).json({ status: "allowed" });
    } else {
      // Update env manually for now, or log it if no backend DB
      console.log(`New user to be added: ${Username}`);
      return res.status(403).json({ status: "error", message: "User not allowed" });
    }
  } else {
    res.status(405).json({ status: "error", message: "Method not allowed" });
  }
}
