const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
app.use(cors());
app.use(express.json());
const port = 3000 || process.env.PORT;

app.get("/api", (req, res) => {
  const { slack_name, track } = req.query;

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const date = new Date();

  const today = date.getDay();

  try {
    res.status(200).json({
      slack_name,
      track,
      current_day: days[today],
      utc_time: date,
      github_file_url:
        "https://github.com/Chosen2730/hng-stage-one/blob/main/app.js",
      github_repo_url: "https://github.com/Chosen2730/hng-stage-one",
      status_code: 200,
    });
  } catch (error) {
    throw new Error();
  }
});

app.get("/", (req, res) => res.send("HNG Stage One Backend Task"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
