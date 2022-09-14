import { Exercise, StrengthSet } from '../graphql/generated/graphql';

export const ADD_EXERCISE_TO_WORKOUT = 'ADD_EXERCISE_TO_WORKOUT';
export const ADD_SET_TO_EXERCISE = 'ADD_SET_TO_EXERCISE';

export interface IinitialState {
  exercises: Exercise[];
}

export interface IExercisesState {
  exercises: Exercise[];
}

export interface IAddExerciseToWorkout {
  type: typeof ADD_EXERCISE_TO_WORKOUT;
  payload: Exercise;
}

export interface IAddStrengthSetToExercise {
  type: typeof ADD_SET_TO_EXERCISE;
  payload: StrengthSet;
}

export type ExercisesDispatchTypes =
  | IAddExerciseToWorkout
  | IAddStrengthSetToExercise;
