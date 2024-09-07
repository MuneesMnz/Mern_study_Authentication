import React, { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutContext";
import { CREATE_WORKOUTS } from "../context/WorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");
  const [error, setError] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const workout = { title, reps, load };

      if (!user) {
        setError("You must be logged in");
        return null;
      }
      const responce = await fetch("http://localhost:4000/api/workout", {
        method: "POST",
        body: JSON.stringify(workout),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      });

      const json = await responce.json();
      if (!responce.ok) {
        setError(json.error);
        setEmptyFields(json.emptyFields);
      }

      if (responce.ok) {
        setError(null);
        setTitle("");
        setLoad("");
        setReps("");
        setEmptyFields([]);
        dispatch({ type: CREATE_WORKOUTS, payload: json });
        console.log("new workout added:", json);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Excersize Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />

      <label>Load (in kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes("load") ? "error" : ""}
      />

      <label>Number of Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes("reps") ? "error" : ""}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
