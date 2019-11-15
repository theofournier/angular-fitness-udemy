import {
  SET_AVAILABLE_EXERCISES,
  SET_PAST_EXERCISES,
  START_EXERCISE,
  STOP_EXERCISE,
  TrainingActions
} from "./training.actions";
import { Exercise } from "./exercise.model";

export interface State {
  availableExercises: Exercise[];
  pastExercises: Exercise[];
  currentExercise: Exercise;
}

const initialState: State = {
  availableExercises: [],
  pastExercises: [],
  currentExercise: null
};

export function trainingReducer(state = initialState, action: TrainingActions) {
  switch (action.type) {
    case SET_AVAILABLE_EXERCISES:
      return {
        ...state,
        availableExercises: action.payload
      };
    case SET_PAST_EXERCISES:
      return {
        ...state,
        pastExercises: action.payload
      };
    case START_EXERCISE:
      return {
        ...state,
        currentExercise: {
          ...state.availableExercises.find(ex => ex.id === action.payload)
        }
      };
    case STOP_EXERCISE:
      return {
        ...state,
        currentExercise: null
      };
    default:
      return state;
  }
}

export const getAvailableExercises = (state: State) => state.availableExercises;
export const getPastExercises = (state: State) => state.pastExercises;
export const getCurrentExercises = (state: State) => state.currentExercise;
export const getIsOngoingExercise = (state: State) =>
  state.currentExercise != null;
