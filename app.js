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

  function getCurrentUTCWithValidation() {
    const currentDate = new Date();
    const currentUTC = new Date(currentDate.toISOString());

    // Create a new Date object for UTC time with a +/-2 minute range
    const minUTC = new Date(currentUTC);
    minUTC.setMinutes(currentUTC.getMinutes() - 2);

    const maxUTC = new Date(currentUTC);
    maxUTC.setMinutes(currentUTC.getMinutes() + 2);

    // Validate the current UTC time is within the range
    if (currentUTC >= minUTC && currentUTC <= maxUTC) {
      // Format the current UTC time as "YYYY-MM-DDTHH:MM:SSZ"
      const formattedUTC = currentUTC.toISOString().slice(0, -1) + "Z";
      return formattedUTC;
    } else {
      return "UTC time is not within the valid range.";
    }
  }

  // Call the function to get and validate the current UTC time
  const currentUTC = getCurrentUTCWithValidation();

  try {
    res.status(200).json({
      slack_name,
      track,
      current_day: days[today],
      utc_time: currentUTC.slice(0, 19) + "Z",
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
