import { useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutContext";
import { SET_WORKOUTS } from "../context/WorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  // const [workouts, setWorkouts] = useState([]);

  const fetchWorkouts = async () => {
    if (!user) {
      // setError("You must be logged in");
      console.log("error in user");
      return 
    }
    try {
      const responce = await fetch("http://localhost:4000/api/workout", {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      const json = await responce.json();
      if (responce.ok) {
        dispatch({ type: SET_WORKOUTS, payload: json });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);
  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails workout={workout} key={workout._id} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
