import moment from 'moment';
import React from 'react';
import { GiWeightLiftingUp } from 'react-icons/gi';
import { Workout } from '../../../../graphql/generated/graphql';
import styles from './MyWorkouts.module.css';

interface WorkoutCardv2Props {
  workout: Workout;
}

export const WorkoutCardv2: React.FC<WorkoutCardv2Props> = ({ workout }) => {
  return (
    <div className="shadow  h-[320px] p-6 rounded-lg mt-5   bg-[#fafafa] flex items-center flex-col justify-center">
      <div className="mt-6">
        <GiWeightLiftingUp size={70} color="#2b3042" />
      </div>
      <div className="">
        <h3 className="mt-1 text-xl text-center text-[#2b3042] font-medium">
          {workout.name}
        </h3>
        <div className="flex justify-center space-x-2 text-gray-400 text-sm mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              d="M20.694 11.6412C20.694 16.7079 16.5819 20.82 11.5152 20.82C6.44853 20.82 2.33643 16.7079 2.33643 11.6412C2.33643 6.5745 6.44853 2.4624 11.5152 2.4624C16.5819 2.4624 20.694 6.5745 20.694 11.6412Z"
              stroke="black"
              strokeWidth="0.621691"
            />
            <path d="M11.6046 11.909L7.63135 7.89111" stroke="black" />
            <path
              d="M17.2182 6.10449L11.2866 12.1715"
              stroke="black"
              strokeWidth="0.674725"
            />
          </svg>

          <p>
            {moment(workout.endTime).diff(workout.startTime, 'minutes')} mins
          </p>
        </div>
        <div className="flex  justify-center space-x-2 text-gray-400 text-sm mt-2 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p>{moment(workout.startTime).format('MMM do, YYYY H:mm')}</p>
        </div>
        {workout.exercises.length > 0 && (
          <div className="overflow-hidden max-h-[115px] relative transition-all duration-1000 ease-in-out">
            <ul className="mt-2">
              {workout.exercises.map((exercise) => {
                const current =
                  exerciseToColor[exercise.category.toLowerCase()];
                return (
                  <li
                    key={exercise.id}
                    className="truncate flex items-center space-x-3"
                  >
                    <div
                      className={`${current.color} h-[10px] w-[10px] mr-2`}
                    ></div>
                    {exercise.name}
                  </li>
                );
              })}
            </ul>
            <div
              className={`w-full h-[53px] absolute bottom-0 left-0 ${styles.showMore} text-center`}
            >
              <div>
                <button className="rounded inline-flex my-0 mx-auto bg-gray-50 hover:bg-gray-100 px-7 border py-1">
                  View
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const exerciseToColor: any = {
  abs: {
    color: 'bg-purple-500',
  },
  back: {
    color: 'bg-red-500',
  },
  biceps: {
    color: 'bg-green-500',
  },
  cardio: {
    color: 'bg-blue-500',
  },
  chest: {
    color: 'bg-yellow-500',
  },
  legs: {
    color: 'bg-gray-500',
  },
  shoulders: {
    color: 'bg-lime-500',
  },
  triceps: {
    color: 'bg-teal-500',
  },
};
