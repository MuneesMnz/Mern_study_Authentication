import { LOGOUT } from "../context/AuthContext";
import { SET_WORKOUTS } from "../context/WorkoutContext";
import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispathc: workoutDispatch } = useWorkoutsContext();
  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: LOGOUT });
    workoutDispatch({ type: SET_WORKOUTS, payload: null });
  };

  return { logout };
};
