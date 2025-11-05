// server/server.js
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fetch from "node-fetch";

dotenv.config(); // load .env from root

const app = express(); // ← must be declared BEFORE using `app`
app.use(cors()); // allow frontend requests

const PEXELS_KEY = process.env.REACT_APP_PEXELS_API_KEY;

app.get("/api/pexels/:keyword", async (req, res) => {
  const keyword = req.params.keyword;

  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${keyword}&per_page=1`,
      {
        headers: {
          Authorization: PEXELS_KEY,
        },
      }
    );

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).send(text);
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch from Pexels" });
  }
});

// Start backend server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
