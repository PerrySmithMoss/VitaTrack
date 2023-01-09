import React, { useEffect, useState } from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';
import { Exercise } from '../../../graphql/generated/graphql';
import { useGlobalContext } from '../../../state/context/global.context';

interface ExerciseListProps {}

export const ExerciseList: React.FC<ExerciseListProps> = () => {
  const { selectedMuscleGroup, setWorkoutExercises, workoutExercises } =
    useGlobalContext();
  const [exercises, setExercises] = useState<any>();

  function findExercisesForSelectedMuscleGroup() {
    const exercise = exerciseList1.find((exercise) =>
      Object.keys(exercise).every(
        (key) => key === selectedMuscleGroup.toLowerCase()
      )
    );

    return exercise;
  }

  const handleSelectExercise = (exercise: Exercise) => {
    setWorkoutExercises((prev: Exercise[]) => [...prev, exercise]);
    // exercisesDispatch({ payload: exercise, type: 'ADD_EXERCISE_TO_WORKOUT' });
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
              (exercise: Exercise, index: number) => (
                <li
                  key={index}
                  onClick={() => handleSelectExercise(exercise)}
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

const exerciseList1 = [
  {
    abs: [
      {
        name: 'Crunches',
        category: 'Abs',
        exerciseType: 'Strength',
        unilateral: false,
        strengthSets: [
          {
            setNumber: 1,
            weight: '',
            reps: '',
            notes: '',
          },
        ],
      },
      {
        name: 'Leg Raises',
        category: 'Abs',
        exerciseType: 'Strength',
        unilateral: false,
        strengthSets: [
          {
            setNumber: 1,
            weight: '',
            reps: '',
            notes: '',
          },
        ],
      },
      {
        name: 'Machine Crunch',
        category: 'Abs',
        exerciseType: 'Strength',
        unilateral: false,
        strengthSets: [
          {
            setNumber: 1,
            weight: '',
            reps: '',
            notes: '',
          },
        ],
      },
      {
        name: 'Rope Crunch',
        category: 'Abs',
        exerciseType: 'Strength',
        unilateral: false,
        strengthSets: [
          {
            setNumber: 1,
            weight: '',
            reps: '',
            notes: '',
          },
        ],
      },
    ],
  },
  {
    back: [
      {
        name: 'Lat Pulldown',
        category: 'Back',
        exerciseType: 'Strength',
        unilateral: false,
        strengthSets: [
          {
            setNumber: 1,
            weight: '',
            reps: '',
            notes: '',
          },
        ],
      },
      {
        name: 'Barbell Rows',
        category: 'Back',
        exerciseType: 'Strength',
        unilateral: false,
        strengthSets: [
          {
            setNumber: 1,
            weight: '',
            reps: '',
            notes: '',
          },
        ],
      },
      {
        name: 'Deadlift',
        category: 'Back',
        exerciseType: 'Strength',
        unilateral: false,
        strengthSets: [
          {
            setNumber: 1,
            weight: '',
            reps: '',
            notes: '',
          },
        ],
      },
      {
        name: 'Dumbbell Rows',
        category: 'Back',
        exerciseType: 'Strength',
        unilateral: false,
        strengthSets: [
          {
            setNumber: 1,
            weight: '',
            reps: '',
            notes: '',
          },
        ],
      },
    ],
  },
  {
    biceps: [
      {
        name: 'Barbell Curl',
        category: 'Biceps',
        exerciseType: 'Strength',
        unilateral: false,
        strengthSets: [
          {
            setNumber: 1,
            weight: '',
            reps: '',
            notes: '',
          },
        ],
      },
      {
        name: 'Dumbbell Curl',
        category: 'Biceps',
        exerciseType: 'Strength',
        unilateral: false,
        strengthSets: [
          {
            setNumber: 1,
            weight: '',
            reps: '',
            notes: '',
          },
        ],
      },
      {
        name: 'Preacher Curl',
        category: 'Biceps',
        exerciseType: 'Strength',
        unilateral: false,
        strengthSets: [
          {
            setNumber: 1,
            weight: '',
            reps: '',
            notes: '',
          },
        ],
      },
      {
        name: 'Cable Curl',
        category: 'Biceps',
        exerciseType: 'Strength',
        unilateral: false,
        strengthSets: [
          {
            setNumber: 1,
            weight: '',
            reps: '',
            notes: '',
          },
        ],
      },
    ],
  },
  {
    cardio: [
      {
        name: 'Assault Bike',
        category: 'Cardio',
        exerciseType: 'Cardio',
        unilateral: false,
        cardioSets: [
          {
            setNumber: 1,

            minutes: '',
            seconds: '',
            distance: '',
            caloriesBurned: '',
            notes: '',
          },
        ],
      },
      {
        name: 'Running',
        category: 'Cardio',
        exerciseType: 'Cardio',
        unilateral: false,
        cardioSets: [
          {
            setNumber: 1,

            minutes: '',
            seconds: '',
            distance: '',
            caloriesBurned: '',
            notes: '',
          },
        ],
      },
      {
        name: 'Rowing Machine',
        category: 'Cardio',
        exerciseType: 'Cardio',
        unilateral: false,
        cardioSets: [
          {
            setNumber: 1,
            minutes: '',
            seconds: '',
            distance: '',
            caloriesBurned: '',
            notes: '',
          },
        ],
      },
      {
        name: 'Swimming',
        category: 'Cardio',
        exerciseType: 'Cardio',
        unilateral: false,
        cardioSets: [
          {
            setNumber: 1,
            minutes: '',
            seconds: '',
            distance: '',
            caloriesBurned: '',
            notes: '',
          },
        ],
      },
    ],
  },
  {
    chest: [
      {
        name: 'Barbell Bench Press',
        category: 'Chest',
        exerciseType: 'Strength',
        unilateral: false,
        strengthSets: [
          {
            setNumber: 1,
            weight: '',
            reps: '',
            notes: '',
          },
        ],
      },
      {
        name: 'Dumbbell Bench Press',
        category: 'Chest',
        exerciseType: 'Strength',
        unilateral: false,
        strengthSets: [
          {
            setNumber: 1,
            weight: '',
            reps: '',
            notes: '',
          },
        ],
      },
      {
        name: 'Machine Press',
        category: 'Chest',
        exerciseType: 'Strength',
        unilateral: false,
        strengthSets: [
          {
            setNumber: 1,
            weight: '',
            reps: '',
            notes: '',
          },
        ],
      },
      {
        name: 'Cable Crossover',
        category: 'Chest',
        exerciseType: 'Strength',
        unilateral: false,
        strengthSets: [
          {
            setNumber: 1,
            weight: '',
            reps: '',
            notes: '',
          },
        ],
      },
    ],
  },
  {
    legs: [
      {
        name: 'Barbell Squat',
        category: 'Legs',
        exerciseType: 'Strength',
        unilateral: false,
        strengthSets: [
          {
            setNumber: 1,
            weight: '',
            reps: '',
            notes: '',
          },
        ],
      },
      {
        name: 'Leg Extentions',
        category: 'Legs',
        exerciseType: 'Strength',
        unilateral: false,
        strengthSets: [
          {
            setNumber: 1,
            weight: '',
            reps: '',
            notes: '',
          },
        ],
      },
      {
        name: 'Leg Press',
        category: 'Legs',
        exerciseType: 'Strength',
        unilateral: false,
        strengthSets: [
          {
            setNumber: 1,
            weight: '',
            reps: '',
            notes: '',
          },
        ],
      },
      {
        name: 'Dumbbell Lunges',
        category: 'Legs',
        exerciseType: 'Strength',
        unilateral: true,
        strengthSets: [
          {
            setNumber: 1,
            weight: '',
            reps: '',
            notes: '',
          },
        ],
      },
    ],
  },
  {
    shoulders: [
      {
        name: 'Dumbbell Military Press',
        category: 'Shoulders',
        exerciseType: 'Strength',
        unilateral: false,
        strengthSets: [
          {
            setNumber: 1,
            weight: '',
            reps: '',
            notes: '',
          },
        ],
      },
      {
        name: 'Dumbbell Lateral Raises',
        category: 'Shoulders',
        exerciseType: 'Strength',
        unilateral: false,
        strengthSets: [
          {
            setNumber: 1,
            weight: '',
            reps: '',
            notes: '',
          },
        ],
      },
      {
        name: 'Cable Lateral Raises',
        category: 'Shoulders',
        exerciseType: 'Strength',
        unilateral: true,
        strengthSets: [
          {
            setNumber: 1,
            weight: '',
            reps: '',
            notes: '',
          },
        ],
      },
      {
        name: 'Machine Military Press',
        category: 'Shoulders',
        exerciseType: 'Strength',
        unilateral: false,
        strengthSets: [
          {
            setNumber: 1,
            weight: '',
            reps: '',
            notes: '',
          },
        ],
      },
    ],
  },
  {
    triceps: [
      {
        name: 'Close Grip Bench Press',
        category: 'Triceps',
        exerciseType: 'Strength',
        unilateral: false,
        strengthSets: [
          {
            setNumber: 1,
            weight: '',
            reps: '',
            notes: '',
          },
        ],
      },
      {
        name: 'Barbell Skullcrushers',
        category: 'Triceps',
        exerciseType: 'Strength',
        unilateral: false,
        strengthSets: [
          {
            setNumber: 1,
            weight: '',
            reps: '',
            notes: '',
          },
        ],
      },
      {
        name: 'Rope Extentions',
        category: 'Triceps',
        exerciseType: 'Strength',
        unilateral: false,
        strengthSets: [
          {
            setNumber: 1,
            weight: '',
            reps: '',
            notes: '',
          },
        ],
      },
      {
        name: 'Behind Body Dumbbell Extentions',
        category: 'Triceps',
        exerciseType: 'Strength',
        unilateral: false,
        strengthSets: [
          {
            setNumber: 1,
            weight: '',
            reps: '',
            notes: '',
          },
        ],
      },
    ],
  },
];
