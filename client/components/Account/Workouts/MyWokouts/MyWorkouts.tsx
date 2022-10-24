import React, { useState } from 'react';
import {
  GetUsersWorkoutsQuery,
  useGetUsersWorkoutsQuery,
  Workout,
} from '../../../../graphql/generated/graphql';
import { WorkoutCardv2 } from './WorkoutCardv2';

interface MyWorkoutsProps {}

export const MyWorkouts: React.FC<MyWorkoutsProps> = ({}) => {
  const { data } = useGetUsersWorkoutsQuery<GetUsersWorkoutsQuery>();
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
