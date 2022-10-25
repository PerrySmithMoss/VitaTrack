import moment from 'moment';
import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { GiWeightLiftingUp } from 'react-icons/gi';
import {
  GetUsersWorkoutsQuery,
  useDeleteWorkoutMutation,
  useEditWorkoutMutation,
  useGetUsersWorkoutsQuery,
  Workout,
} from '../../../../graphql/generated/graphql';
import { useGlobalContext } from '../../../../state/context/global.context';
import { WorkoutList } from '../../../List/Workout/WorkoutList';
import { Modal } from '../../../Modals/Modal';
import styles from './MyWorkouts.module.css';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiMoreVertical } from 'react-icons/fi';
import { Popover } from '../../../Popover/Popover';
import { AiOutlineDelete } from 'react-icons/ai';

interface WorkoutCardv2Props {
  workout: Workout;
}

export const WorkoutCardv2: React.FC<WorkoutCardv2Props> = ({ workout }) => {
  const [isEditWorkoutModalOpen, setIsEditWorkoutModalOpen] = useState(false);
  const [isWorkoutOptionsPopoverOpen, setIsWorkoutOptionsPopoverOpen] =
    useState(false);

  const {
    workoutExercises,
    setIsAddExerciseOpen,
    isAddExerciseOpen,
    setWorkoutExercises,
  } = useGlobalContext();

  const [currWorkout, setCurrWorkout] = useState({
    name: workout.name,
    startDate: new Date(workout.startTime),
    endDate: new Date(workout.endTime),
    bodyWeight: workout.bodyweight,
    notes: workout.notes,
  });

  const { refetch: refetchUsersWorkouts } =
    useGetUsersWorkoutsQuery<GetUsersWorkoutsQuery>();

  const { mutate: deleteWorkout } = useDeleteWorkoutMutation({
    onSuccess: () => {
      refetchUsersWorkouts();
      setIsWorkoutOptionsPopoverOpen(false);

      toast.success('Workout deleted ✅', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
  });

  const { mutate: saveWorkout } = useEditWorkoutMutation({
    onSuccess: () => {
      refetchUsersWorkouts();
      setIsAddExerciseOpen(false);
      setIsEditWorkoutModalOpen(false);
      setWorkoutExercises([]);

      toast.success('Workout saved ✅', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
  });

  function handleUserInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setCurrWorkout({
      ...currWorkout,
      [name]: name === 'bodyWeight' ? parseFloat(value) : value,
    });
  }

  async function handleSaveWorkout() {
    let exercises: any = [...workoutExercises];

    exercises = exercises.map(
      ({ createdAt, updatedAt, workoutId, ...rest }: any) => {
        if (rest.exerciseType === 'Strength') {
          return {
            ...rest,
            strengthSets: rest.strengthSets.map(
              ({ createdAt, updatedAt, exerciseId, ...rest }: any) => rest
            ),
          };
        } else if (rest.exerciseType === 'Cardio') {
          return {
            ...rest,
            cardioSets: rest.cardioSets.map(
              ({ createdAt, updatedAt, exerciseId, ...rest }: any) => rest
            ),
          };
        }
      }
    );

    saveWorkout({
      workoutId: workout.id,
      name: currWorkout.name,
      startTime: moment(currWorkout.startDate).toISOString(),
      endTime: moment(currWorkout.endDate).toISOString(),
      bodyweight: currWorkout.bodyWeight,
      notes: currWorkout.notes,
      exercises: exercises,
    });
  }

  function handleAddExercise() {
    setIsAddExerciseOpen(!isAddExerciseOpen);
  }

  const handleEditWorkout = () => {
    setWorkoutExercises(workout.exercises);
    setIsEditWorkoutModalOpen(true);
  };

  const handleDeleteWorkout = (workoutId: number) => {
    deleteWorkout({ workoutId });
  };

  return (
    <>
      <div className="shadow relative  h-[320px] w-[275px] p-6 rounded-lg mt-5   bg-[#fafafa] flex items-center flex-col justify-center">
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
            <p>{moment(workout.startTime).format('ddd D MMM')}</p>
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
                {/* <div>
                  <button
                    onClick={handleEditWorkout}
                    className="rounded inline-flex my-0 mx-auto bg-gray-50 hover:bg-gray-100 px-7 border py-1"
                  >
                    Edit
                  </button>
                </div> */}
              </div>
            </div>
          )}
        </div>
        <div>
          <button
            onClick={() =>
              setIsWorkoutOptionsPopoverOpen(!isWorkoutOptionsPopoverOpen)
            }
            title="Delete Workout"
            className="absolute top-2 right-3"
          >
            <FiMoreVertical
              size={30}
              className="cursor-pointer rotate-90 text-brand-green hover:text-brand-green-hover"
            />
          </button>
          {isWorkoutOptionsPopoverOpen ? (
            <Popover>
              <ul>
                <li
                  onClick={handleEditWorkout}
                  className="p-3 flex items-center space-x-2 text-gray-800 cursor-pointer hover:bg-gray-200"
                >
                  <FiMoreVertical size={20} className="cursor-pointer" />
                  <span>Edit workout</span>
                </li>
                <li
                  onClick={() => handleDeleteWorkout(workout.id)}
                  className="p-3 flex items-center text-gray-800 space-x-2 cursor-pointer hover:bg-gray-200"
                >
                  <AiOutlineDelete size={20} className="cursor-pointer " />
                  <span>Delete workout</span>
                </li>
              </ul>
            </Popover>
          ) : null}
        </div>
      </div>
      {isEditWorkoutModalOpen && (
        <Modal
          open={isEditWorkoutModalOpen}
          onClose={() => setIsEditWorkoutModalOpen(false)}
          selector="addWorkoutModal"
          title="Edit Workout"
        >
          <div className="relative flex  flex-col overflow-x-hidden w-full flex-grow flex-shrink min-h-0 overflow-auto">
            <div className="overflow-y-auto h-auto max-h-[600px] w-full">
              <section className="w-full flex flex-col mb-4 bg-gray-100">
                <div className="">
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={currWorkout.name}
                    onChange={handleUserInputChange}
                    className="block border-t bg-transparent py-3 px-4  w-full outline-none"
                  />
                  <div className="mx-4">
                    <hr />
                  </div>
                  <div className="flex items-center">
                    <div className="block border-l text-gray-800 bg-transparent py-3 px-4 w-full outline-none">
                      <span>Start Time:</span>
                    </div>
                    <div className="block text-gray-800 bg-transparent py-3 px-4 w-full outline-none">
                      <ReactDatePicker
                        selected={currWorkout.startDate}
                        // selected={moment(data.startTime) || moment()}
                        onChange={(date) =>
                          setCurrWorkout({
                            ...currWorkout,
                            startDate: date as Date,
                          })
                        }
                        dateFormat="MMM do, yyyy H:mm a"
                        wrapperClassName="datePicker"
                        showTimeSelect
                        timeIntervals={1}
                        timeFormat="HH:mm"
                        className="block cursor-pointer text-right text-gray-800 bg-transparent  w-full outline-none"
                      />
                    </div>
                  </div>
                  <div className="mx-4">
                    <hr />
                  </div>
                  <div className="flex items-center">
                    <div className="block border-l text-gray-800 bg-transparent py-3 px-4 w-full outline-none">
                      <span>End Time:</span>
                    </div>
                    <div className="block text-gray-800 bg-transparent py-3 px-4 w-full outline-none">
                      <ReactDatePicker
                        selected={currWorkout.endDate}
                        // selected={moment("September 6th, 2022 10:22 AM", 'MMMM Do, yyyy h:mm aa').toDate() || workout.endDate}
                        // selected={moment(data.endTime) || moment()}
                        onChange={(date) =>
                          setCurrWorkout({
                            ...currWorkout,
                            endDate: date as Date,
                          })
                        }
                        dateFormat="MMM do, yyyy H:mm a"
                        wrapperClassName="datePicker"
                        showTimeSelect
                        timeIntervals={1}
                        timeFormat="HH:mm"
                        className="block cursor-pointer text-right text-gray-800 bg-transparent w-full outline-none"
                      />
                    </div>
                  </div>
                  <div className="mx-4">
                    <hr />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="block border-l text-gray-800 bg-transparent py-3 px-4 w-full outline-none">
                      <span>Bodyweight</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-800  py-3 px-4">
                      <div>
                        <input
                          type="number"
                          step="0.1"
                          value={currWorkout.bodyWeight || ''}
                          name="bodyWeight"
                          // onKeyPress={(event) => {
                          //   if (
                          //     !/^-?[0-9]*[.][0-9]+$/.test(event.key)
                          //   ) {
                          //     event.preventDefault();
                          //   }
                          // }}
                          onChange={handleUserInputChange}
                          className="block text-right text-gray-800 bg-transparent outline-none"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <div>
                          <span>(lbs)</span>
                        </div>
                        <div>
                          <span className="">{'>'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mx-4">
                    <hr />
                  </div>
                  <input
                    type="text"
                    placeholder="Notes"
                    value={currWorkout.notes || ''}
                    name="notes"
                    onChange={handleUserInputChange}
                    className="block  text-gray-800 border-b bg-transparent py-3 px-4 w-full outline-none"
                  />
                </div>
              </section>
              <WorkoutList />
              <div className="mx-3 mt-4">
                <button
                  onClick={handleAddExercise}
                  className="rounded w-full py-2 bg-gray-100 hover:bg-gray-200  text-gray-800 focus:shadow-outline focus:outline-none"
                >
                  Add Exercise
                </button>
              </div>
              <footer className="flex justify-end px-8 pb-6 pt-8">
                <button
                  id="submit"
                  onClick={handleSaveWorkout}
                  disabled={
                    currWorkout.name.length === 0 ||
                    workout.exercises.length === 0
                  }
                  className={`${
                    currWorkout.name.length === 0 ||
                    workout.exercises.length === 0
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  } rounded px-5 py-1.5 bg-brand-green hover:bg-brand-green-hover text-white focus:shadow-outline focus:outline-none`}
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditWorkoutModalOpen(false)}
                  id="cancel"
                  className="ml-3 rounded-sm px-3 hover:text-gray-600 focus:shadow-outline focus:outline-none"
                >
                  Cancel
                </button>
              </footer>
            </div>
          </div>
        </Modal>
      )}
    </>
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
