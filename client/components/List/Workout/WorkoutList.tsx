import React from 'react';
import { Exercise as IExercise } from '../../../graphql/generated/graphql';
import { useGlobalContext } from '../../../state/context/global.context';
import { Exercise } from './Exercise';

interface WorkoutListProps {}

export const WorkoutList: React.FC<WorkoutListProps> = () => {
  const { workoutExercises } = useGlobalContext();

  return (
    <ul className="list-none">
      {workoutExercises &&
        workoutExercises.map((exercise: IExercise, exIndex) => (
          <Exercise key={exIndex} exercise={exercise} exIndex={exIndex} />
        ))}
    </ul>
  );
};
