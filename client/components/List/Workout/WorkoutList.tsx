import React, { useEffect, useRef } from 'react';
import { AiOutlineHistory, AiOutlineStar } from 'react-icons/ai';
import { BsBarChartLine } from 'react-icons/bs';
import { FiMoreVertical } from 'react-icons/fi';
import { Exercise, useCreateWorkoutMutation } from '../../../graphql/generated/graphql';
import { useGlobalContext } from '../../../state/context/global.context';

interface WorkoutListProps {}

export const WorkoutList: React.FC<WorkoutListProps> = ({}) => {
  const { workoutExercises, setWorkoutExercises } = useGlobalContext();
  const scrollRef = useRef<HTMLLIElement | null>(null);

  const handleStrengthSetInputChange = (
    exerciseIndex: number,
    setIndex: number,
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { value, name } = e.target;

    let exercises: Exercise[] = [...workoutExercises];

    exercises[exerciseIndex].strengthSets[setIndex][
      (name as 'notes') || 'reps' || 'setNumber' || 'weight'
    ] = value

    setWorkoutExercises(exercises);
  };

  const handleCardioSetInputChange = (
    exerciseIndex: number,
    setIndex: number,
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { value, name } = e.target;

    let exercises: Exercise[] = [...workoutExercises];

    exercises[exerciseIndex].cardioSets[setIndex][
      (name as 'notes' ||
        'seconds' ||
        'distance' ||
        'caloriesBurned' ||
        'minutes')
    ]  = value

    setWorkoutExercises(exercises);
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [workoutExercises]);

  return (
    <ul className="list-none">
      {workoutExercises &&
        workoutExercises.map((exercise: Exercise, exIndex) => (
          <li
            key={exIndex}
            ref={scrollRef}
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
                  {exercise.exerciseType === 'Strength' ? (
                    <div>
                      {exercise.strengthSets.map((strengthSet, setIndex) => (
                        <div
                          key={setIndex}
                          className="flex items-center space-x-4 py-2 mx-5"
                        >
                          <div>
                            <div className="h-7 w-7 border rounded-full flex items-center justify-center">
                              <div>
                                <span className="text-sm text-gray-500">
                                  {strengthSet.setNumber}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col w-36">
                            <div>
                              <span className="text-gray-500 text-sm">
                                Weight
                              </span>
                            </div>
                            <div>
                              <input
                                className="w-full bg-transparent text-gray-800 outline-none text-sm"
                                type="float"
                                step="0.1"
                                name="weight"
                                onChange={(e) =>
                                  handleStrengthSetInputChange(
                                    exIndex,
                                    setIndex,
                                    e
                                  )
                                }
                              />
                            </div>
                          </div>
                          <div className="flex flex-col  w-36">
                            <div>
                              <span className="text-gray-500 text-sm">
                                Reps
                              </span>
                            </div>
                            <div>
                              <input
                                className="w-full bg-transparent text-gray-800 outline-none  text-sm "
                                type="number"
                                name="reps"
                                onChange={(e) =>
                                  handleStrengthSetInputChange(
                                    exIndex,
                                    setIndex,
                                    e
                                  )
                                }
                              />
                            </div>
                          </div>
                          <div className="flex flex-col w-full">
                            <div>
                              <span className="text-gray-500  text-sm">
                                Notes
                              </span>
                            </div>
                            <div>
                              <input
                                value={strengthSet.notes || ''}
                                name="notes"
                                onChange={(e) =>
                                  handleStrengthSetInputChange(
                                    exIndex,
                                    setIndex,
                                    e
                                  )
                                }
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
                      ))}
                    </div>
                  ) : (
                    <div>
                      {exercise.cardioSets.map((cardioSet, setIndex) => (
                        <div
                          key={setIndex}
                          className="flex  space-x-4 py-2 mx-5"
                        >
                          <div>
                            <div className="h-full flex items-center justify-center">
                              <div className="h-7 w-7 border rounded-full flex items-center justify-center">
                                <span className="text-sm text-gray-500">
                                  {cardioSet.setNumber}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 grid-rows-2">
                            <div className="flex flex-col">
                              <div>
                                <span className="text-gray-500 text-sm">
                                  Minutes
                                </span>
                              </div>
                              <div>
                                <input
                                  className="w-full bg-transparent text-gray-800 outline-none text-sm"
                                  type="number"
                                  value={cardioSet.minutes || ''}
                                  name="minutes"
                                  onChange={(e) =>
                                    handleCardioSetInputChange(
                                      exIndex,
                                      setIndex,
                                      e
                                    )
                                  }
                                />
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <div>
                                <span className="text-gray-500 text-sm">
                                  Seconds
                                </span>
                              </div>
                              <div>
                                <input
                                  className="w-full bg-transparent text-gray-800 outline-none  text-sm "
                                  type="number"
                                  value={cardioSet.seconds || ''}
                                  name="seconds"
                                  onChange={(e) =>
                                    handleCardioSetInputChange(
                                      exIndex,
                                      setIndex,
                                      e
                                    )
                                  }
                                />
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <div>
                                <span className="text-gray-500 text-sm">
                                  Distance
                                </span>
                              </div>
                              <div>
                                <input
                                  className="w-full bg-transparent text-gray-800 outline-none text-sm"
                                  type="float"
                                  step="0.1"
                                  value={cardioSet.distance || ''}
                                  name="distance"
                                  onChange={(e) =>
                                    handleCardioSetInputChange(
                                      exIndex,
                                      setIndex,
                                      e
                                    )
                                  }
                                />
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <div>
                                <span className="text-gray-500 text-sm">
                                  Kcal
                                </span>
                              </div>
                              <div>
                                <input
                                  className="w-full bg-transparent text-gray-800 outline-none  text-sm "
                                  type="number"
                                  value={cardioSet.caloriesBurned || ''}
                                  name="caloriesBurned"
                                  onChange={(e) =>
                                    handleCardioSetInputChange(
                                      exIndex,
                                      setIndex,
                                      e
                                    )
                                  }
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col w-full">
                            <div>
                              <span className="text-gray-500  text-sm">
                                Notes
                              </span>
                            </div>
                            <div>
                              <input
                                className="w-full bg-transparent text-gray-800 text-sm outline-none"
                                type="text"
                                value={cardioSet.notes || ''}
                                name="notes"
                                onChange={(e) =>
                                  handleCardioSetInputChange(
                                    exIndex,
                                    setIndex,
                                    e
                                  )
                                }
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
                      ))}
                    </div>
                  )}
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
