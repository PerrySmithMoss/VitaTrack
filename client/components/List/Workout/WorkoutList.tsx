import React, { useEffect, useRef } from 'react';
import { AiOutlineHistory, AiOutlineStar } from 'react-icons/ai';
import { BsBarChartLine } from 'react-icons/bs';
import { FiMoreVertical } from 'react-icons/fi';
import { useGlobalContext } from '../../../context/global.context';
import { IExercise } from '../../../types/workout';

interface WorkoutListProps {}

export const WorkoutList: React.FC<WorkoutListProps> = ({}) => {
  const { selectedMuscleGroup, workoutExercises } = useGlobalContext();
  const scrollRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [workoutExercises]);

  return (
    <ul className=" list-none">
      {workoutExercises &&
        workoutExercises.map((exercise: IExercise, index) => (
          <li
            key={index}
            ref={scrollRef}
            // onClick={() => handleSelectExercise(exercise)}
            className="mt- flex items-center justify-between text-gray-800"
          >
            <div className="flex space-y-3 my-4 flex-col  bg-gray-100 boder-b">
              {/* Exercises */}
              <div className="border-t">
                {/* Exercise Name */}
                <div className="py-2">
                  <div>
                    <div className="flex justify-between items-center mx-5">
                      <div>
                        <h5 className="text-lg font-semibold">
                          {exercise.name}
                        </h5>
                      </div>
                      <div>
                        <FiMoreVertical
                          size={24}
                          className="cursor-pointer text-brand-green hover:text-brand-green-hover"
                        />
                      </div>
                    </div>
                    <div className="ml-5 pt-2">
                      <hr />
                    </div>
                  </div>
                  {/* Weight, Reps, Notes */}
                  <div>
                    <div className="flex items-center space-x-4 py-2 mx-5">
                      <div>
                        <div className="h-7 w-7 border rounded-full flex items-center justify-center">
                          <div>
                            <span className="pl-0.5 text-sm text-gray-500">
                              1
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col w-36">
                        <div>
                          <span className="text-gray-500 text-sm">Weight</span>
                        </div>
                        <div>
                          <input
                            className="w-full bg-transparent text-gray-800 outline-none text-sm"
                            type="number"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col  w-36">
                        <div>
                          <span className="text-gray-500 text-sm">Reps</span>
                        </div>
                        <div>
                          <input
                            className="w-full bg-transparent text-gray-800 outline-none  text-sm "
                            type="number"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col w-full">
                        <div>
                          <span className="text-gray-500  text-sm">Notes</span>
                        </div>
                        <div>
                          <input
                            className="w-full bg-transparent text-gray-800 text-sm outline-none"
                            type="text"
                          />
                        </div>
                      </div>
                      <div>
                        <FiMoreVertical
                          size={24}
                          className="cursor-pointer text-brand-green hover:text-brand-green-hover"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="ml-5">
                    <hr />
                  </div>
                  {/* Actions */}
                  <div>
                    <div className="flex justify-between items-center pt-3 mx-5">
                      <div>
                        <button className="cursor-pointer text-brand-green hover:text-brand-green-hover">
                          Add set
                        </button>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div>
                          <AiOutlineHistory
                            size={24}
                            className="cursor-pointer text-brand-green hover:text-brand-green-hover"
                          />
                        </div>
                        <div>
                          <BsBarChartLine
                            size={24}
                            className="cursor-pointer text-brand-green hover:text-brand-green-hover"
                          />
                        </div>
                        <div>
                          <AiOutlineStar
                            size={24}
                            className="cursor-pointer text-brand-green hover:text-brand-green-hover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
};
