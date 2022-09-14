import React, { createContext, useContext, useReducer } from 'react';
import { ExercisesDispatchTypes, IExercisesState } from '../../types/exercise';
import exercisesReducer, {
  initialState,
} from '../reducer/exercise.reducer';

export interface IExercisesContextProps {
  exercisesState: IExercisesState;
  exercisesDispatch: React.Dispatch<ExercisesDispatchTypes>;
}

export const ExercisesContext = createContext<IExercisesContextProps>({
  exercisesState: initialState,
  exercisesDispatch: () => {},
});

interface IExercisesStateProvider {
  children: React.ReactNode;
}

export const ExercisesContextProvider = ({
  children,
}: IExercisesStateProvider) => {
  const [exercisesState, exercisesDispatch] = useReducer(
    exercisesReducer,
    initialState
  );

  return (
    <ExercisesContext.Provider value={{ exercisesState, exercisesDispatch }}>
      {children}
    </ExercisesContext.Provider>
  );
};

export const useExercisesContext = () => useContext(ExercisesContext);
