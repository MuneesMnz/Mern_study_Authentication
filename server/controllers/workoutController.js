const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

//GET all workouts
const getWorkouts = async (req, res) => {
  try {
    const user_id = req.user._id;
    // Fetch all workouts and sort by creation date (latest first)
    const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });
    // Respond with a status of 200 (OK) and the list of workouts in JSON format
    res.status(200).json(workouts);
  } catch (error) {
    // If there's an error, respond with status 400 and the error message
    res.status(400).json({ error: error.message });
  }
};

// ----------------------------------

//GET a single workouts
const getSingleWorkout = async (req, res) => {
  const { id } = req.params;

  // Check if the provided ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such id available" });
  }
  try {
    const workout = await Workout.findById(id);
    // If the workout doesn't exist, return a 404 error
    if (!workout) {
      return res.status(404).json({ error: "No such Workout" });
    }
    // If found, respond with status 200 and the workout data
    res.status(200).json(workout);
  } catch (error) {
    // In case of an error, respond with status 400 and the error message
    res.status(400).json({ error: error.message });
  }
};

// ----------------------------------

//CREATE a new workouts
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  // Check for any missing required fields and store them in an array
  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }

  // If there are any missing fields, return a 400 error with a message
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "please fill in all fields ", emptyFields });
  }

  // Add the new workout to the database
  try {
    const user_id = req.user._id;
    const workout = await Workout.create({ title, load, reps, user_id });
    console.log(workout);

    // Respond with status 200 and the created workout data
    res.status(200).json(workout);
  } catch (error) {
    // In case of an error, respond with status 400 and the error message
    res.status(400).json({ error: error.message });
    console.log(error);
  }
  //   res.json({ message: "post a new workout" });
};

// ----------------------------------

//DELETE a  workouts
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  // Check if the provided ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }
  // Find and delete the workout by its ID
  const workout = await Workout.findOneAndDelete({ _id: id });

  // If the workout doesn't exist, return a 400 error
  if (!workout) {
    return res.status(400).json({ error: "No Such workout" });
  }

  // If successfully deleted, respond with status 200 and the deleted workout data
  res.status(200).json(workout);
};

// ----------------------------------

//UPDATE a  workouts

const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout in id " + id });
  }

  // Find the workout by ID and update it with the new data from the request body
  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  // If the workout doesn't exist, return a 400 error
  if (!workout) {
    return res.status(400).json({ error: "No such workout in workout" });
  }

  // If successfully updated, respond with status 200 and the updated workout data
  res.status(200).json(workout);
};

// Export the controller functions so they can be used in routes
module.exports = {
  createWorkout,
  getWorkouts,
  getSingleWorkout,
  deleteWorkout,
  updateWorkout,
};
