require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");
const cors = require("cors");

//express app
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/workout", workoutRoutes);
app.use("/api/user", userRoutes);

//connect Mongoos
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    //listen for request
    app.listen(process.env.PORT, () => {
      console.log(`connected to db & listening on Port ${process.env.PORT}!`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
