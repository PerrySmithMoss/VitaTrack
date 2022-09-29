import React from 'react';
import {
  GetUsersWorkoutsQuery,
  useGetUsersWorkoutsQuery,
  Workout,
} from '../../../../graphql/generated/graphql';
import { WorkoutCard } from './WorkoutCard';
import { WorkoutCardv2 } from './WorkoutCardv2';

interface MyWorkoutsProps {}

export const MyWorkouts: React.FC<MyWorkoutsProps> = ({}) => {
  const { data, refetch: refetchUsersWorkouts } =
    useGetUsersWorkoutsQuery<GetUsersWorkoutsQuery>();

  // console.log('Workouts: ', data);
  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-[#2b3042]">My Workouts</h2>
        </div>
      </div>
      <div className="flex items-center mt-2">
        <div className="flex flex-row flex-wrap gap-x-6 gap-y-2">
          {data?.getUsersWorkouts?.data?.map((workout) => (
            <WorkoutCardv2 key={workout.id} workout={workout as Workout} />
          ))}
        </div>
      </div>
    </div>
  );
};

// const workouts: IWorkout[] = [
//   {
//     name: 'Push (A)',
//     type: 'Strength',
//     startTime: 'Sun 5th June, 14:00',
//     endTime: 'Sun 5th June, 16:00',
//     bodyWeight: 170.2,
//     notes:
//       'Lorem ipsum lorem ipsum, Lorem ipsum lorem ipsum, Lorem ipsum lorem ipsum.',
//     exercises: [
//       {
//         name: 'Cuffed Lateral Cable Raise',
//         category: 'Shoulders',
//         exerciseType: 'Strength',
//         unilateral: true,
//         sets: [
//           {
//             setNumber: 1,
//             weight: 15,
//             reps: 20,
//             notes: 'I did a 2 count hold in both end ranges.',
//           },
//           {
//             setNumber: 2,
//             weight: 20,
//             reps: 14,
//             notes: '',
//           },
//           {
//             setNumber: 3,
//             weight: 25,
//             reps: 9,
//             notes: '',
//           },
//         ],
//       },
//       {
//         name: 'Incline Dumbbell Press',
//         category: 'Chest',
//         exerciseType: 'Strength',
//         unilateral: false,
//         sets: [
//           {
//             setNumber: 1,
//             weight: 20,
//             reps: 11,
//             notes: 'Did a 3 count eccentric and 1 second pause in hole.',
//           },
//           {
//             setNumber: 2,
//             weight: 22.5,
//             reps: 8,
//             notes: '',
//           },
//           {
//             setNumber: 3,
//             weight: 25,
//             reps: 8,
//             notes: '',
//           },
//         ],
//       },
//       {
//         name: 'Decline Chest Press',
//         category: 'Chest',
//         exerciseType: 'Strength',
//         unilateral: false,
//         sets: [
//           {
//             setNumber: 1,
//             weight: 40,
//             reps: 19,
//             notes: 'Focusing on mind-muscle connection.',
//           },
//           {
//             setNumber: 2,
//             weight: 45,
//             reps: 14,
//             notes: '',
//           },
//           {
//             setNumber: 3,
//             weight: 60,
//             reps: 10,
//             notes: '',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: 'Pull (A)',
//     type: 'Strength',
//     startTime: 'Sun 7th June, 14:00',
//     endTime: 'Sun 7th June, 16:00',
//     bodyWeight: 170.4,
//     notes:
//       'Lorem ipsum lorem ipsum, Lorem ipsum lorem ipsum, Lorem ipsum lorem ipsum.',
//     exercises: [
//       {
//         name: 'Cuffed Lateral Cable Raise',
//         category: 'Shoulders',
//         exerciseType: 'Strength',
//         unilateral: true,
//         sets: [
//           {
//             setNumber: 1,
//             weight: 15,
//             reps: 20,
//             notes: 'I did a 2 count hold in both end ranges.',
//           },
//           {
//             setNumber: 2,
//             weight: 20,
//             reps: 14,
//             notes: '',
//           },
//           {
//             setNumber: 3,
//             weight: 25,
//             reps: 9,
//             notes: '',
//           },
//         ],
//       },
//       {
//         name: 'Incline Dumbbell Press',
//         category: 'Chest',
//         exerciseType: 'Strength',
//         unilateral: false,
//         sets: [
//           {
//             setNumber: 1,
//             weight: 20,
//             reps: 11,
//             notes: 'Did a 3 count eccentric and 1 second pause in hole.',
//           },
//           {
//             setNumber: 2,
//             weight: 22.5,
//             reps: 8,
//             notes: '',
//           },
//           {
//             setNumber: 3,
//             weight: 25,
//             reps: 8,
//             notes: '',
//           },
//         ],
//       },
//       {
//         name: 'Decline Chest Press',
//         category: 'Chest',
//         exerciseType: 'Strength',
//         unilateral: false,
//         sets: [
//           {
//             setNumber: 1,
//             weight: 40,
//             reps: 19,
//             notes: 'Focusing on mind-muscle connection.',
//           },
//           {
//             setNumber: 2,
//             weight: 45,
//             reps: 14,
//             notes: '',
//           },
//           {
//             setNumber: 3,
//             weight: 60,
//             reps: 10,
//             notes: '',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: 'Push (B)',
//     type: 'Strength',
//     startTime: 'Sun 9th June, 14:00',
//     endTime: 'Sun 9th June, 16:00',
//     bodyWeight: 169.9,
//     notes:
//       'Lorem ipsum lorem ipsum, Lorem ipsum lorem ipsum, Lorem ipsum lorem ipsum.',
//     exercises: [
//       {
//         name: 'Cuffed Lateral Cable Raise',
//         category: 'Shoulders',
//         exerciseType: 'Strength',
//         unilateral: true,
//         sets: [
//           {
//             setNumber: 1,
//             weight: 15,
//             reps: 20,
//             notes: 'I did a 2 count hold in both end ranges.',
//           },
//           {
//             setNumber: 2,
//             weight: 20,
//             reps: 14,
//             notes: '',
//           },
//           {
//             setNumber: 3,
//             weight: 25,
//             reps: 9,
//             notes: '',
//           },
//         ],
//       },
//       {
//         name: 'Incline Dumbbell Press',
//         category: 'Chest',
//         exerciseType: 'Strength',
//         unilateral: false,
//         sets: [
//           {
//             setNumber: 1,
//             weight: 20,
//             reps: 11,
//             notes: 'Did a 3 count eccentric and 1 second pause in hole.',
//           },
//           {
//             setNumber: 2,
//             weight: 22.5,
//             reps: 8,
//             notes: '',
//           },
//           {
//             setNumber: 3,
//             weight: 25,
//             reps: 8,
//             notes: '',
//           },
//         ],
//       },
//       {
//         name: 'Decline Chest Press',
//         category: 'Chest',
//         exerciseType: 'Strength',
//         unilateral: false,
//         sets: [
//           {
//             setNumber: 1,
//             weight: 40,
//             reps: 19,
//             notes: 'Focusing on mind-muscle connection.',
//           },
//           {
//             setNumber: 2,
//             weight: 45,
//             reps: 14,
//             notes: '',
//           },
//           {
//             setNumber: 3,
//             weight: 60,
//             reps: 10,
//             notes: '',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: 'Legs (A)',
//     type: 'Strength',
//     startTime: 'Sun 10th June, 14:00',
//     endTime: 'Sun 10th June, 16:00',
//     bodyWeight: 170.2,
//     notes:
//       'Lorem ipsum lorem ipsum, Lorem ipsum lorem ipsum, Lorem ipsum lorem ipsum.',
//     exercises: [
//       {
//         name: 'Cuffed Lateral Cable Raise',
//         category: 'Shoulders',
//         exerciseType: 'Strength',
//         unilateral: true,
//         sets: [
//           {
//             setNumber: 1,
//             weight: 15,
//             reps: 20,
//             notes: 'I did a 2 count hold in both end ranges.',
//           },
//           {
//             setNumber: 2,
//             weight: 20,
//             reps: 14,
//             notes: '',
//           },
//           {
//             setNumber: 3,
//             weight: 25,
//             reps: 9,
//             notes: '',
//           },
//         ],
//       },
//       {
//         name: 'Incline Dumbbell Press',
//         category: 'Chest',
//         exerciseType: 'Strength',
//         unilateral: false,
//         sets: [
//           {
//             setNumber: 1,
//             weight: 20,
//             reps: 11,
//             notes: 'Did a 3 count eccentric and 1 second pause in hole.',
//           },
//           {
//             setNumber: 2,
//             weight: 22.5,
//             reps: 8,
//             notes: '',
//           },
//           {
//             setNumber: 3,
//             weight: 25,
//             reps: 8,
//             notes: '',
//           },
//         ],
//       },
//       {
//         name: 'Decline Chest Press',
//         category: 'Chest',
//         exerciseType: 'Strength',
//         unilateral: false,
//         sets: [
//           {
//             setNumber: 1,
//             weight: 40,
//             reps: 19,
//             notes: 'Focusing on mind-muscle connection.',
//           },
//           {
//             setNumber: 2,
//             weight: 45,
//             reps: 14,
//             notes: '',
//           },
//           {
//             setNumber: 3,
//             weight: 60,
//             reps: 10,
//             notes: '',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: 'Pull (B)',
//     type: 'Stregth',
//     startTime: 'Sun 12th June, 14:00',
//     endTime: 'Sun 12th June, 16:00',
//     bodyWeight: 171.0,
//     notes:
//       'Lorem ipsum lorem ipsum, Lorem ipsum lorem ipsum, Lorem ipsum lorem ipsum.',
//     exercises: [
//       {
//         name: 'Cuffed Lateral Cable Raise',
//         category: 'Shoulders',
//         exerciseType: 'Strength',
//         unilateral: true,
//         sets: [
//           {
//             setNumber: 1,
//             weight: 15,
//             reps: 20,
//             notes: 'I did a 2 count hold in both end ranges.',
//           },
//           {
//             setNumber: 2,
//             weight: 20,
//             reps: 14,
//             notes: '',
//           },
//           {
//             setNumber: 3,
//             weight: 25,
//             reps: 9,
//             notes: '',
//           },
//         ],
//       },
//       {
//         name: 'Incline Dumbbell Press',
//         category: 'Chest',
//         exerciseType: 'Strength',
//         unilateral: false,
//         sets: [
//           {
//             setNumber: 1,
//             weight: 20,
//             reps: 11,
//             notes: 'Did a 3 count eccentric and 1 second pause in hole.',
//           },
//           {
//             setNumber: 2,
//             weight: 22.5,
//             reps: 8,
//             notes: '',
//           },
//           {
//             setNumber: 3,
//             weight: 25,
//             reps: 8,
//             notes: '',
//           },
//         ],
//       },
//       {
//         name: 'Decline Chest Press',
//         category: 'Chest',
//         exerciseType: 'Strength',
//         unilateral: false,
//         sets: [
//           {
//             setNumber: 1,
//             weight: 40,
//             reps: 19,
//             notes: 'Focusing on mind-muscle connection.',
//           },
//           {
//             setNumber: 2,
//             weight: 45,
//             reps: 14,
//             notes: '',
//           },
//           {
//             setNumber: 3,
//             weight: 60,
//             reps: 10,
//             notes: '',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: 'Legs (B)',
//     type: 'Strength',
//     startTime: 'Sun 13th June, 14:00',
//     endTime: 'Sun 13th June, 16:00',
//     bodyWeight: 170.2,
//     notes:
//       'Lorem ipsum lorem ipsum, Lorem ipsum lorem ipsum, Lorem ipsum lorem ipsum.',
//     exercises: [
//       {
//         name: 'Cuffed Lateral Cable Raise',
//         category: 'Shoulders',
//         exerciseType: 'Strength',
//         unilateral: true,
//         sets: [
//           {
//             setNumber: 1,
//             weight: 15,
//             reps: 20,
//             notes: 'I did a 2 count hold in both end ranges.',
//           },
//           {
//             setNumber: 2,
//             weight: 20,
//             reps: 14,
//             notes: '',
//           },
//           {
//             setNumber: 3,
//             weight: 25,
//             reps: 9,
//             notes: '',
//           },
//         ],
//       },
//       {
//         name: 'Incline Dumbbell Press',
//         category: 'Chest',
//         exerciseType: 'Strength',
//         unilateral: false,
//         sets: [
//           {
//             setNumber: 1,
//             weight: 20,
//             reps: 11,
//             notes: 'Did a 3 count eccentric and 1 second pause in hole.',
//           },
//           {
//             setNumber: 2,
//             weight: 22.5,
//             reps: 8,
//             notes: '',
//           },
//           {
//             setNumber: 3,
//             weight: 25,
//             reps: 8,
//             notes: '',
//           },
//         ],
//       },
//       {
//         name: 'Decline Chest Press',
//         category: 'Chest',
//         exerciseType: 'Strength',
//         unilateral: false,
//         sets: [
//           {
//             setNumber: 1,
//             weight: 40,
//             reps: 19,
//             notes: 'Focusing on mind-muscle connection.',
//           },
//           {
//             setNumber: 2,
//             weight: 45,
//             reps: 14,
//             notes: '',
//           },
//           {
//             setNumber: 3,
//             weight: 60,
//             reps: 10,
//             notes: '',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: 'Morning Cardio',
//     type: 'Cardio',
//     startTime: 'Sun 2nd June, 14:00',
//     endTime: 'Sun 2nd June, 14:30',
//     bodyWeight: 170.0,
//     notes:
//       'Lorem ipsum lorem ipsum, Lorem ipsum lorem ipsum, Lorem ipsum lorem ipsum.',
//     exercises: [
//       {
//         name: 'Assault Bike',
//         category: 'Cardio',
//         exerciseType: 'Cardio',
//         unilateral: false,
//         sets: [
//           {
//             setNumber: 1,
//             minutes: 30,
//             seconds: 0,
//             distance: 400,
//             kcal: 400,
//             notes: 'No stopping.',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: 'Evening Walk',
//     type: 'Cardio',
//     startTime: 'Sun 2nd June, 20:00',
//     endTime: 'Sun 2nd June, 21:06',
//     bodyWeight: 170.1,
//     notes:
//       'Lorem ipsum lorem ipsum, Lorem ipsum lorem ipsum, Lorem ipsum lorem ipsum.',
//     exercises: [
//       {
//         name: 'Walking',
//         category: 'Cardio',
//         exerciseType: 'Cardio',
//         unilateral: false,
//         sets: [
//           {
//             setNumber: 1,
//             minutes: 66,
//             seconds: 20,
//             distance: 1.3,
//             kcal: 102,
//             notes: '',
//           },
//         ],
//       },
//     ],
//   },
// ];