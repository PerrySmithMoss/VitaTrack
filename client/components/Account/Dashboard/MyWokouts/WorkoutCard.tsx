import React from 'react';
import { GiWeightLiftingUp, GiRun } from 'react-icons/gi';
import { Workout } from '../../../../graphql/generated/graphql';

interface WorkoutCardProps {
  workout: Workout;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
  return (
    <div className="relative bg-white pt-3 pb-1 px-2 rounded-3xl w-full  cursor-pointer border hover:shadow">
      {/* <div
        className={`text-white flex items-center absolute rounded-full py-4 px-4 shadow-xl ${
          workout.type === 'Cardio' ? 'bg-purple-500' : 'bg-blue-500'
        } left-4 -top-6`}
      >
        {workout.type === 'Cardio' ? (
          <GiRun size={30} color="white" />
        ) : (
          <GiWeightLiftingUp size={30} color="white" />
        )}
      </div> */}
      {/* <div
        className={`text-white flex items-center space-x-1.5 absolute rounded-full right-3 top-3`}
      >
        <div className="bg-brand-green hover:bg-brand-green-hover rounded-full py-2 px-2">
          <HiOutlinePencilAlt size={18} color="white" />
        </div>
        <div className="bg-brand-green hover:bg-brand-green-hover rounded-full py-2 px-2">
          <MdOutlineDelete size={18} color="white" />
        </div>
      </div> */}

        <div className="px-6">
          <p className="text-xl font-semibold my-2">{workout.name}</p>
          <div className="flex space-x-2 text-gray-400 text-sm mt-4">
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

            <p>120 min</p>
          </div>
          <div className="flex space-x-2 text-gray-400 text-sm my-3">
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
            <p>{workout.startTime}</p>
          </div>
        </div>
        {/* <div className="border-t-2"></div>

        <div className="flex justify-between px-6">
          <div className="my-2">
            <p className="font-semibold text-base mb-2">Team Member</p>
            <div className="flex space-x-2">
              <img
                src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                className="w-6 h-6 rounded-full"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/e/ec/Woman_7.jpg"
                className="w-6 h-6 rounded-full"
              />
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxSqK0tVELGWDYAiUY1oRrfnGJCKSKv95OGUtm9eKG9HQLn769YDujQi1QFat32xl-BiY&usqp=CAU"
                className="w-6 h-6 rounded-full"
              />
            </div>
          </div>
          <div className="my-2">
            <p className="font-semibold text-base mb-2">Progress</p>
            <div className="text-base text-gray-400 font-semibold">
              <p>34%</p>
            </div>
          </div>
        </div> */}

    </div>
  );
};
