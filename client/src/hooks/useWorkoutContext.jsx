import { useContext } from "react";
import { WorkoutContext } from "../context/WorkoutContext";

export const useWorkoutsContext = () => {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw Error("useWorkoutsContext must be inside an WorkoutContextProvider");
  }

  return context;
};
