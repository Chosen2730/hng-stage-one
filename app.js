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

  // current_utc_time = datetime.datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ");

  const getTime = () => {
    const currMin = date.getUTCMinutes();
    const randomOffset = Math.floor(Math.random() * 4 - 2) * 60000;
    const adDate = new Date(date.getTime() + randomOffset);
    const div = randomOffset / 60000;
    const adMin = (60 + (currMin + div)) % 60;
    const formattedUTC = `${adDate.getUTCHours()}:${adMin
      .toString()
      .padStart(2, "0")}`;

    return formattedUTC;
  };

  try {
    res.status(200).json({
      slack_name,
      track,
      current_day: days[today],
      utc_time: getTime(),
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
