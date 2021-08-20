const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("./models/excerciseModule");
require("./models/userModule");

const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/user");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection establised successfully");
});

app.use(exercisesRouter);
app.use(usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
