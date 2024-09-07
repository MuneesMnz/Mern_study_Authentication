const express = require("express");
const {
  createWorkout,
  getWorkouts,
  getSingleWorkout,
  updateWorkout,
  deleteWorkout,
} = require("../controllers/workoutController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all work
router.use(requireAuth);

//GET all workouts
router.get("/", getWorkouts);

//Get a single workout
router.get("/:id", getSingleWorkout);

//POST a new workout
router.post("/", createWorkout);

//DELETE a workout
router.delete("/:id", deleteWorkout);
//PATCH a workout
router.patch("/:id", updateWorkout);

module.exports = router;
