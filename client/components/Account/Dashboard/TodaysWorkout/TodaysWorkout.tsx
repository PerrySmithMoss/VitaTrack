import React, { useState } from 'react';
import { GiWeightLiftingUp } from 'react-icons/gi';
import {
  GetUsersWorkoutsQuery,
  useCreateWorkoutMutation,
  useGetUsersWorkoutByDateQuery,
  useGetUsersWorkoutsQuery,
} from '../../../../graphql/generated/graphql';
import { Modal } from '../../../Modals/Modal';
import styles from './TodaysWorkout.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import { useGlobalContext } from '../../../../state/context/global.context';

import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { WorkoutList } from '../../../List/Workout/WorkoutList';
import { Drawer } from '../../../Drawer/Drawer';
import { FiChevronLeft, FiMoreHorizontal } from 'react-icons/fi';
import { AiOutlinePlus } from 'react-icons/ai';
import { ExerciseList } from '../../../List/Exercise/ExerciseList';
import { MuscleGroupList } from '../../../List/Exercise/MuscleGroupList';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface TodaysWorkoutProps {}

export const TodaysWorkout: React.FC<TodaysWorkoutProps> = ({}) => {
  const [isAddExerciseOpen, setIsAddExerciseOpen] = useState(false);
  const [workout, setWorkout] = useState({
    name: '',
    startDate: new Date(),
    endDate: new Date(),
    bodyWeight: null,
    notes: '',
  });
  const [isAddWorkoutModalOpen, setIsAddWorkoutModalOpen] = useState(false);
  const {
    selectedMuscleGroup,
    setSelectedMuscleGroup,
    workoutExercises,
    setWorkoutExercises,
  } = useGlobalContext();
  const router = useRouter()

  const { data: todaysWorkout, refetch: fetchTodaysWorkout } =
    useGetUsersWorkoutByDateQuery();
  const { refetch: refetchUsersWorkouts } =
    useGetUsersWorkoutsQuery<GetUsersWorkoutsQuery>();

  const { mutate } = useCreateWorkoutMutation({
    onSuccess: () => {
      fetchTodaysWorkout();
      refetchUsersWorkouts();
      setIsAddExerciseOpen(false);
      setIsAddWorkoutModalOpen(false);
      setWorkoutExercises([]);

      toast.success('Workout added 💪', {
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

    setWorkout({
      ...workout,
      [name]: name === 'bodyWeight' ? parseFloat(value) : value,
    });
  }

  async function handleCompleteWorkout() {
    mutate({
      name: workout.name,
      startTime: moment(workout.startDate).format(),
      endTime: moment(workout.endDate).format(),
      bodyweight: workout.bodyWeight,
      notes: workout.notes,
      exercises: workoutExercises,
    });
  }

  function handleAddExercise() {
    setIsAddExerciseOpen(!isAddExerciseOpen);
  }

  const handleViewWorkouts = () => {
    router.push("/account/workouts")
  }

  const handleAddWorkoutForToday = () => {
    setWorkoutExercises([])
    setIsAddWorkoutModalOpen(true)
  }

  if (todaysWorkout?.getUsersWorkoutByDate.data) {
    return (
      <section className="mt-2">
        <h2 className="text-2xl font-bold text-[#2b3042]">Today's Workout</h2>
        <div className="shadow h-[270px] min-w-[300px] rounded-lg mt-5 w-full  bg-[#fafafa] flex items-center flex-col justify-center">
          <div className="mt-6">
            <GiWeightLiftingUp size={70} color="#2b3042" />
          </div>
          <div className="">
            <h3 className="mt-1 text-xl text-center text-[#2b3042] font-medium">
              {todaysWorkout.getUsersWorkoutByDate.data.name}
            </h3>
            <div className="overflow-hidden max-h-[140px] relative transition-all duration-1000 ease-in-out">
              <ul className="mt-3">
                {todaysWorkout.getUsersWorkoutByDate.data.exercises.map(
                  (exercise) => {
                    const current =
                      exerciseToColor[exercise.category.toLowerCase()];
                    return (
                      <li
                        key={exercise.id}
                        className="truncate flex items-center space-x-3"
                      >
                        <div
                          className={`${current.color}  h-[10px] w-[10px] mr-2`}
                        ></div>
                        {exercise.name}
                      </li>
                    );
                  }
                )}
              </ul>
              <div
                className={`w-full h-[60px] absolute bottom-0 left-0 ${styles.showMore} text-center`}
              >
                <div>
                  <button
                  onClick={handleViewWorkouts}
                  className="rounded inline-flex my-0 mx-auto bg-gray-50 hover:bg-gray-100 px-7 border py-1">
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="mt-2 pr-4">
      <h2 className="text-2xl font-bold text-[#2b3042]">Today's Workout</h2>
      <div className="shadow h-[200px] xs:h-[270px] w-full xxs:w-[300px] rounded-lg mt-5  bg-[#fafafa] flex items-center flex-col justify-center">
        <p className="px-6 xxs:px-14 text-center font-medium text-lg leading-6">
          You have not yet added a workout for today. 
        </p>
        <div>
          <button
            onClick={handleAddWorkoutForToday}
            className="mt-5 rounded text-white inline-flex my-0 mx-auto bg-brand-green hover:bg-brand-green-hover px-7  py-2.5"
          >
            Add workout
          </button>
        </div>
        <div className='mt-5'>
          <Link href="/account/workouts">
            <span className='text-brand-green cursor-pointer hover:text-brand-green-hover'>
            My workouts
            </span>
          </Link>
        </div>
      </div>
      {isAddWorkoutModalOpen && (
        <Modal
          open={isAddWorkoutModalOpen}
          onClose={() => setIsAddWorkoutModalOpen(false)}
          selector="addWorkoutModal"
          title="Add Workout"
        >
          <div className="relative flex  flex-col overflow-x-hidden w-full flex-grow flex-shrink min-h-0 overflow-auto">
            <div className="overflow-y-auto h-auto max-h-[600px] w-full">
              <section className="w-full flex flex-col mb-4 bg-gray-100">
                <div className="">
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={workout.name}
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
                        selected={workout.startDate}
                        onChange={(date) =>
                          setWorkout({
                            ...workout,
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
                        selected={workout.endDate}
                        onChange={(date) =>
                          setWorkout({
                            ...workout,
                            endDate: date as Date,
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
                  <div className="flex items-center justify-between">
                    <div className="block border-l text-gray-800 bg-transparent py-3 px-4 w-full outline-none">
                      <span>Bodyweight</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-800  py-3 px-4">
                      <div>
                        <input
                          type="number"
                          step="0.1"
                          value={workout.bodyWeight || ''}
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
                    value={workout.notes}
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
                  onClick={handleCompleteWorkout}
                  disabled={
                    workout.name.length === 0 || workoutExercises.length === 0
                  }
                  className={`${
                    workout.name.length === 0 || workoutExercises.length === 0
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  } rounded px-5 py-1.5 bg-brand-green hover:bg-brand-green-hover text-white focus:shadow-outline focus:outline-none`}
                >
                  Complete
                </button>
                <button
                  onClick={() => setIsAddWorkoutModalOpen(false)}
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
      <Drawer
        isOpen={isAddExerciseOpen}
        setIsOpen={setIsAddExerciseOpen}
        title="Add Exercise"
      >
        <div>
          <header className="flex items-center justify-between px-2 py-5 bg-brand-green text-white ">
            <div className="flex items-center">
              {selectedMuscleGroup !== '' ? (
                <div
                  onClick={() => setSelectedMuscleGroup('')}
                  className="flex items-center cursor-pointer group"
                >
                  <FiChevronLeft
                    size={26}
                    className="cursor-pointer text-white group-hover:text-gray-200"
                  />
                  <p className="cursor-pointer text-white group-hover:text-gray-200">
                    Select Exercise
                  </p>
                </div>
              ) : (
                <button className="hover:text-gray-200" type="button">
                  Cancel
                </button>
              )}
            </div>
            <div>
              {selectedMuscleGroup !== '' ? (
                <h4 className="text-xl font-bold">{selectedMuscleGroup}</h4>
              ) : (
                <h4 className="text-xl font-bold">Select Exercise</h4>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                className="relative cursor-pointer flex text-center items-center justify-center h-8 w-8 rounded-full bg-brand-green hover:bg-brand-green-hover"
                data-modal-toggle="default-modal"
              >
                <AiOutlinePlus size={26} color="white" />
              </button>
              <button
                type="button"
                className="relative cursor-pointer flex text-center items-center justify-center h-8 w-8 rounded-full bg-brand-green hover:bg-brand-green-hover"
                data-modal-toggle="default-modal"
              >
                <FiMoreHorizontal size={26} color="white" />
              </button>
            </div>
          </header>
          <div>
            <div className="flex w-full justify-center items-center py-1">
              <div className="relative mt-4 w-full mx-4">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="searchExercises"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-brand-green focus:border-brand-green w-full pl-10 p-2.5"
                  placeholder="Search"
                />
              </div>
            </div>
            {selectedMuscleGroup !== '' ? (
              <div>
                <ExerciseList />
              </div>
            ) : (
              <div>
                <MuscleGroupList />
              </div>
            )}
          </div>
        </div>
      </Drawer>
    </section>
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
