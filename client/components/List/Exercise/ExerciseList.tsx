import React, { useEffect, useState } from 'react';
import { FiChevronRight, FiMoreHorizontal } from 'react-icons/fi';
import { useGlobalContext } from '../../../context/global.context';

interface ExerciseListProps {}

interface IExercise {
  id: number;
  name: string;
}

export const ExerciseList: React.FC<ExerciseListProps> = ({}) => {
  const { selectedMuscleGroup } = useGlobalContext();
  const [exercises, setExercises] = useState<any>();

  function findExercisesForSelectedMuscleGroup() {
    const exercise = exerciseList1.find((exercise) =>
      Object.keys(exercise).every(
        (key) => key === selectedMuscleGroup.toLowerCase()
      )
    );

    return exercise;
  }

  const handleSelectExercise = (exerciseName: string) => {
    
  };

  useEffect(() => {
    setExercises(findExercisesForSelectedMuscleGroup());
  }, [selectedMuscleGroup]);

  return (
    <ul className="mt-4">
      <hr />
      {selectedMuscleGroup !== '' && (
        <>
          {exercises &&
            exercises[selectedMuscleGroup.toLowerCase()].map(
              (exercise: IExercise) => (
                <li
                  key={exercise.id}
                  onClick={() => handleSelectExercise(exercise.name)}
                  className="p-4 cursor-pointer hover:bg-gray-100 border-b flex items-center justify-between text-gray-800"
                >
                  <div>{exercise.name}</div>
                  <div>
                    <FiMoreHorizontal
                      size={20}
                      className="hover:text-gray-600"
                    />
                  </div>
                </li>
              )
            )}
        </>
      )}
    </ul>
  );
};

const exerciseList2 = [
  {
    abs: [
      {
        id: 1,
        muscleGroup: 'abs',
        name: 'Crunches',
      },
      {
        id: 2,
        name: 'Leg Raises',
      },
      {
        id: 3,
        name: 'Machine Crunch',
      },
      {
        id: 4,
        name: 'Rope Crunch',
      },
    ],
  },
  {
    back: [
      {
        id: 1,
        name: 'Crunches',
      },
      {
        id: 2,
        name: 'Leg Raises',
      },
      {
        id: 3,
        name: 'Machine Crunch',
      },
      {
        id: 4,
        name: 'Rope Crunch',
      },
    ],
  },
  {
    biceps: [
      {
        id: 1,
        name: 'Crunches',
      },
      {
        id: 2,
        name: 'Leg Raises',
      },
      {
        id: 3,
        name: 'Machine Crunch',
      },
      {
        id: 4,
        name: 'Rope Crunch',
      },
    ],
  },
  {
    cardio: [
      {
        id: 1,
        name: 'Crunches',
      },
      {
        id: 2,
        name: 'Leg Raises',
      },
      {
        id: 3,
        name: 'Machine Crunch',
      },
      {
        id: 4,
        name: 'Rope Crunch',
      },
    ],
  },
  {
    chest: [
      {
        id: 1,
        name: 'Crunches',
      },
      {
        id: 2,
        name: 'Leg Raises',
      },
      {
        id: 3,
        name: 'Machine Crunch',
      },
      {
        id: 4,
        name: 'Rope Crunch',
      },
    ],
  },
  {
    legs: [
      {
        id: 1,
        name: 'Crunches',
      },
      {
        id: 2,
        name: 'Leg Raises',
      },
      {
        id: 3,
        name: 'Machine Crunch',
      },
      {
        id: 4,
        name: 'Rope Crunch',
      },
    ],
  },
  {
    shoulders: [
      {
        id: 1,
        name: 'Crunches',
      },
      {
        id: 2,
        name: 'Leg Raises',
      },
      {
        id: 3,
        name: 'Machine Crunch',
      },
      {
        id: 4,
        name: 'Rope Crunch',
      },
    ],
  },
  {
    triceps: [
      {
        id: 1,
        name: 'Crunches',
      },
      {
        id: 2,
        name: 'Leg Raises',
      },
      {
        id: 3,
        name: 'Machine Crunch',
      },
      {
        id: 4,
        name: 'Rope Crunch',
      },
    ],
  },
];

const exerciseList1 = [
  {
    abs: [
      {
        id: 1,
        name: 'Crunches',
      },
      {
        id: 2,
        name: 'Leg Raises',
      },
      {
        id: 3,
        name: 'Machine Crunch',
      },
      {
        id: 4,
        name: 'Rope Crunch',
      },
    ],
  },
  {
    back: [
      {
        id: 1,
        name: 'Crunches',
      },
      {
        id: 2,
        name: 'Leg Raises',
      },
      {
        id: 3,
        name: 'Machine Crunch',
      },
      {
        id: 4,
        name: 'Rope Crunch',
      },
    ],
  },
  {
    biceps: [
      {
        id: 1,
        name: 'Crunches',
      },
      {
        id: 2,
        name: 'Leg Raises',
      },
      {
        id: 3,
        name: 'Machine Crunch',
      },
      {
        id: 4,
        name: 'Rope Crunch',
      },
    ],
  },
  {
    cardio: [
      {
        id: 1,
        name: 'Crunches',
      },
      {
        id: 2,
        name: 'Leg Raises',
      },
      {
        id: 3,
        name: 'Machine Crunch',
      },
      {
        id: 4,
        name: 'Rope Crunch',
      },
    ],
  },
  {
    chest: [
      {
        id: 1,
        name: 'Crunches',
      },
      {
        id: 2,
        name: 'Leg Raises',
      },
      {
        id: 3,
        name: 'Machine Crunch',
      },
      {
        id: 4,
        name: 'Rope Crunch',
      },
    ],
  },
  {
    legs: [
      {
        id: 1,
        name: 'Crunches',
      },
      {
        id: 2,
        name: 'Leg Raises',
      },
      {
        id: 3,
        name: 'Machine Crunch',
      },
      {
        id: 4,
        name: 'Rope Crunch',
      },
    ],
  },
  {
    shoulders: [
      {
        id: 1,
        name: 'Crunches',
      },
      {
        id: 2,
        name: 'Leg Raises',
      },
      {
        id: 3,
        name: 'Machine Crunch',
      },
      {
        id: 4,
        name: 'Rope Crunch',
      },
    ],
  },
  {
    triceps: [
      {
        id: 1,
        name: 'Crunches',
      },
      {
        id: 2,
        name: 'Leg Raises',
      },
      {
        id: 3,
        name: 'Machine Crunch',
      },
      {
        id: 4,
        name: 'Rope Crunch',
      },
    ],
  },
];
