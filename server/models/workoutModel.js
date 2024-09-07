const mongoose = require("mongoose");

// Create a new schema object from mongoose for defining data structure
const Schema = mongoose.Schema;

// Define the schema for a workout, including its fields and validation rules
const workoutSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Automatically add timestamps (createdAt, updatedAt) to the schema
);

// Export the Workout model based on the workoutSchema for use in other parts of the app
module.exports = mongoose.model("Workout", workoutSchema);
