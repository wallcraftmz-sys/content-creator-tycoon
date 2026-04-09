const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// тест
app.get("/", (req, res) => {
  res.send("API работает");
});

// создать видео
app.post("/video", async (req, res) => {
  const { user_id } = req.body;

  const views = Math.floor(Math.random() * 1000 + 500);
  const earnings = views * 0.02;

  await pool.query(
    "INSERT INTO videos(user_id, views, earnings) VALUES($1, $2, $3)",
    [user_id, views, earnings]
  );

  res.json({ views, earnings });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
