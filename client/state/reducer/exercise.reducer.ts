import {
  ADD_EXERCISE_TO_WORKOUT,
  ADD_SET_TO_EXERCISE,
  ExercisesDispatchTypes,
  IExercisesState,
  IinitialState,
} from '../../types/exercise';

export const initialState: IExercisesState = {
  exercises: [],
};

export const actionTypes = {
  ADD_EXERCISE_TO_WORKOUT: ADD_EXERCISE_TO_WORKOUT,
  ADD_SET_TO_EXERCISE: ADD_SET_TO_EXERCISE,
};

const exercisesReducer = (
  state: IinitialState = initialState,
  action: ExercisesDispatchTypes
): IExercisesState  => {
  switch (action.type) {
    case ADD_EXERCISE_TO_WORKOUT:
      return { exercises: [...state.exercises, action.payload] };
    case ADD_SET_TO_EXERCISE:
      // const findExercise = state.exercises
      return { exercises: [...state.exercises] };
    default:
      return state;
  }
};

export default exercisesReducer;
