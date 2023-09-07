const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = 3000 || process.env.PORT;

app.get("/", (req, res) => {
  const { slack_name, track } = req.query;

  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  const date = new Date();

  const today = date.getDay();

  try {
    res.status(200).json({
      slack_name,
      track,
      current_day: days[today],
      utc_time: date,
      github_file_url: "https://github.com/Chosen2730/hng-stage-one",
      github_repo_url: "https://github.com/Chosen2730/hng-stage-one",
      status_code: 200,
    });
  } catch (error) {
    throw new Error();
  }
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
