import { DELETE_WORKOUTS } from "../context/WorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutsContext } from "../hooks/useWorkoutContext";
import { formatDistanceToNow } from "date-fns";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      // setError("You must be logged in");
      console.log("error in user");
      return 
    }
    const responce = await fetch(
      "http://localhost:4000/api/workout/" + workout._id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );
    const json = await responce.json();
    if (responce.ok) {
      dispatch({ type: DELETE_WORKOUTS, payload: json });
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Number of reps: </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span onClick={handleClick}>delete</span>
    </div>
  );
};

export default WorkoutDetails;
