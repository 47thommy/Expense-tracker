const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
app.use(cors());
app.use(express.json());
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log(
        "database connected and server listening on port",
        process.env.PORT || 4000
      );
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
