import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from "@ngrx/store";

import * as fromUi from "./shared/ui.reducer";
import * as fromAuth from "./auth/auth.reducer";
import * as fromTraining from "./training/training.reducer";

export interface State {
  ui: fromUi.State;
  auth: fromAuth.State;
  training: fromTraining.State;
}

export const reducers: ActionReducerMap<State> = {
  ui: fromUi.uiReducer,
  auth: fromAuth.authReducer,
  training: fromTraining.trainingReducer
};

export const getUiState = createFeatureSelector<fromUi.State>("ui");
export const getIsLoading = createSelector(
  getUiState,
  fromUi.getIsLoading
);

export const getAuthState = createFeatureSelector<fromAuth.State>("auth");
export const getIsAuthenticated = createSelector(
  getAuthState,
  fromAuth.getIsAuthenticated
);

export const getTrainingState = createFeatureSelector<fromTraining.State>(
  "training"
);
export const getAvailableExercises = createSelector(
  getTrainingState,
  fromTraining.getAvailableExercises
);
export const getPastExercises = createSelector(
  getTrainingState,
  fromTraining.getPastExercises
);
export const getCurrentExercises = createSelector(
  getTrainingState,
  fromTraining.getCurrentExercises
);
export const getIsOngoingExercise = createSelector(
  getTrainingState,
  fromTraining.getIsOngoingExercise
);
