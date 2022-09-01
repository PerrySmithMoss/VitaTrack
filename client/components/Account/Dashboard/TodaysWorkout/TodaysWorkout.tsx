import React from 'react';
import { GiWeightLiftingUp } from 'react-icons/gi';
import styles from './TodaysWorkout.module.css';

interface TodaysWorkoutProps {}

export const TodaysWorkout: React.FC<TodaysWorkoutProps> = ({}) => {
  return (
    <section className="mt-2 ">
      <h2 className="text-2xl font-bold text-[#2b3042]">Today's Workout</h2>
      <div className="shadow h-[270px] min-w-[300px] rounded-lg mt-5 w-full  bg-[#fafafa] flex items-center flex-col justify-center">
        <div className="mt-6">
          <GiWeightLiftingUp size={70} color="#2b3042" />
        </div>
        <div className="">
          <h3 className="mt-1 text-xl text-center text-[#2b3042] font-medium">
            Upper Body (A)
          </h3>
          <div className="overflow-hidden max-h-[140px] relative transition-all duration-1000 ease-in-out">
            <ul className="mt-3">
              <li className="truncate flex items-center space-x-3">
                <div className="bg-purple-500 h-[10px] w-[10px] mr-2"></div>
                Single arm lateral cable raises
              </li>
              <li className="truncate flex items-center space-x-3">
                <div className="bg-blue-500 h-[10px] w-[10px] mr-2"></div>
                Incline Dumbbell Press
              </li>{' '}
              <li className="truncate flex items-center space-x-3">
                <div className="bg-blue-500 h-[10px] w-[10px] mr-2"></div>
                Decline Press
              </li>{' '}
              <li className="truncate flex items-center space-x-3">
                <div className="bg-green-500 h-[10px] w-[10px] mr-2"></div>Dips
              </li>{' '}
              <li className="truncate flex items-center space-x-3">
                <div className="bg-blue-500 h-[10px] w-[10px] mr-2"></div>Cable
                Crossover
              </li>{' '}
              <li className="truncate flex items-center space-x-3">
                <div className="bg-purple-500 h-[10px] w-[10px] mr-2"></div>
                Dumbbell Raises
              </li>
              <li className="truncate flex items-center space-x-3">
                <div className="bg-green-500 h-[10px] w-[10px] mr-2"></div>Cable
                Rope Extention
              </li>
              <li className="truncate flex items-center space-x-3">
                <div className="bg-green-500 h-[10px] w-[10px] mr-2"></div>Lying
                down Dumbbell Extention
              </li>
            </ul>
            <div
              className={`w-full h-[50px] absolute bottom-0 left-0 ${styles.showMore} text-center`}
            >
              <div>
                <button className="rounded inline-flex my-0 mx-auto bg-gray-50 hover:bg-gray-100 px-7 border py-1">
                  View
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
