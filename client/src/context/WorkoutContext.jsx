import { createContext, useReducer } from "react";

export const WorkoutContext = createContext();

export const SET_WORKOUTS = "SET_WORKOUTS";
export const CREATE_WORKOUTS = "CREATE_WORKOUTS";
export const DELETE_WORKOUTS = "DELETE_WORKOUTS";

export const workoutReducers = (state, action) => {
  switch (action.type) {
    case SET_WORKOUTS:
      return {
        workouts: action.payload,
      };
    case CREATE_WORKOUTS:
      return {
        workouts: [action.payload, ...state.workouts],
      };
    case DELETE_WORKOUTS:
      return {
        workouts: state.workouts.filter(
          (item) => item._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const WorkoutContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutReducers, {
    workouts: null,
  });
  return (
    <WorkoutContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  );
};
