import React, { useEffect, useRef, useState } from 'react';
import {
  AiOutlineDelete,
  AiOutlineHistory,
  AiOutlineStar,
} from 'react-icons/ai';
import { BsBarChartLine } from 'react-icons/bs';
import { FiMoreVertical } from 'react-icons/fi';
import { Exercise as IExercise } from '../../../graphql/generated/graphql';
import { useGlobalContext } from '../../../state/context/global.context';
import { Popover } from '../../Popover/Popover';

interface ExerciseProps {
  exercise: IExercise;
  exIndex: number;
}

export const Exercise: React.FC<ExerciseProps> = ({ exIndex, exercise }) => {
  const scrollRef = useRef<HTMLLIElement | null>(null);
  const { workoutExercises, setWorkoutExercises } = useGlobalContext();
  const [isExerciseOptionsPopoverOpen, setIsExerciseOptionsPopoverOpen] =
    useState(false);

  const workoutsContainerRef = useRef<HTMLDivElement>(null);

  const handleStrengthSetInputChange = (
    exerciseIndex: number,
    setIndex: number,
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { value, name } = e.target;

    let exercises: IExercise[] = [...workoutExercises];

    exercises[exerciseIndex].strengthSets[setIndex][
      (name as 'notes') || 'reps' || 'setNumber' || 'weight'
    ] = value;

    setWorkoutExercises(exercises);
  };

  const handleCardioSetInputChange = (
    exerciseIndex: number,
    setIndex: number,
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { value, name } = e.target;

    let exercises: IExercise[] = [...workoutExercises];

    exercises[exerciseIndex].cardioSets[setIndex][
      (name as 'notes') ||
        'seconds' ||
        'distance' ||
        'caloriesBurned' ||
        'minutes'
    ] = value;

    setWorkoutExercises(exercises);
  };

  const handleAddSetToExercise = (exIndex: number, exerciseType: string) => {
    let exercises: IExercise[] = [...workoutExercises];

    exercises.map((exercise: any, index) => {
      if (index === exIndex) {
        if (exerciseType === 'Strength') {
          exercise.strengthSets.push({
            setNumber: exercise.strengthSets.length + 1,
            weight: '',
            reps: '',
            notes: '',
          });
        } else if (exerciseType === 'Cardio') {
          exercise.cardioSets.push({
            setNumber: exercise.cardioSets.length + 1,
            weight: '',
            reps: '',
            notes: '',
          });
        }
      }
    });

    setWorkoutExercises(exercises);
  };

  const handleDeleteExercise = (exIndex: number) => {
    const exercises: IExercise[] = [...workoutExercises];

    const filteredExercises = exercises.filter((_exercise, index) => {
      return index !== exIndex;
    });

    console.log("filteredExercises: ", filteredExercises)

    setWorkoutExercises(filteredExercises);
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      <li
        key={exIndex}
        ref={scrollRef}
        className="bg-gray-100 text-gray-800 mt-6"
      >
        <div className="flex space-y-3 flex-col">
          {/* Exercises */}
          <div className="border-t">
            {/* Exercise Name */}
            <div className="pt-2.5">
              <div>
                <div className="flex justify-between items-center mx-5">
                  <div>
                    <h5 className="text-lg font-semibold">{exercise.name}</h5>
                  </div>
                  <div ref={workoutsContainerRef} className="relative">
                    <div>
                      <FiMoreVertical
                        onClick={() =>
                          setIsExerciseOptionsPopoverOpen(
                            !isExerciseOptionsPopoverOpen
                          )
                        }
                        size={24}
                        className="cursor-pointer text-brand-green hover:text-brand-green-hover"
                      />
                    </div>
                    {isExerciseOptionsPopoverOpen && (
                      <Popover>
                        <ul>
                          <li
                            onClick={() => handleDeleteExercise(exIndex)}
                            className="p-3 flex items-center space-x-1 text-red-500 rounded-md cursor-pointer hover:bg-gray-200"
                          >
                            <AiOutlineDelete
                              size={20}
                              className="cursor-pointer text-red-500 hover:text-red-700"
                            />
                            <span>Delete</span>
                          </li>
                        </ul>
                      </Popover>
                    )}
                  </div>
                </div>
                <div className="ml-5 pt-2.5">
                  <hr />
                </div>
              </div>
              {/* Weight, Reps, Notes */}
              {exercise.exerciseType === 'Strength' ? (
                <div>
                  {exercise.strengthSets.map((strengthSet, setIndex) => (
                    <div key={setIndex}>
                      <div className="flex items-center space-x-4 py-2 mx-5">
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
                              type="number"
                              step="0.1"
                              name="weight"
                              defaultValue={strengthSet.weight || ""}
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
                            <span className="text-gray-500 text-sm">Reps</span>
                          </div>
                          <div>
                            <input
                              className="w-full bg-transparent text-gray-800 outline-none  text-sm "
                              type="number"
                              name="reps"
                              defaultValue={strengthSet.reps || ""}
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
                      </div>{' '}
                      <div className="ml-4">
                        <hr />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  {exercise.cardioSets.map((cardioSet, setIndex) => (
                    <>
                      <div key={setIndex}>
                        <div className="flex  space-x-4 py-2 mx-5">
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
                                  type="number"
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
                              // onClick={() =>
                              //   setIsExerciseOptionsPopoverOpen(
                              //     !isExerciseOptionsPopoverOpen
                              //   )
                              // }
                              size={24}
                              className="cursor-pointer text-brand-green hover:text-brand-green-hover"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="ml-4">
                        <hr />
                      </div>
                    </>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </li>
      {/* Actions */}
      <div className="bg-gray-100">
        <div className="text-gray-800 py-2.5">
          <div className="flex justify-between items-center px-5">
            <div>
              <button
                onClick={() =>
                  handleAddSetToExercise(exIndex, exercise.exerciseType)
                }
                className="cursor-pointer text-brand-green hover:text-brand-green-hover"
              >
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
    </>
  );
};
