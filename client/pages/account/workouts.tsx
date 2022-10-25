import { dehydrate, QueryClient } from '@tanstack/react-query';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar/Navbar';
import { SidebarNav } from '../../components/SidebarNav/SidebarNav';
import {
  GetCurrentUserQuery,
  GetUsersWorkoutsQuery,
  useCreateWorkoutMutation,
  useGetCurrentUserQuery,
  useGetUsersWorkoutsQuery,
} from '../../graphql/generated/graphql';
import { MyWorkouts } from '../../components/Account/Workouts/MyWokouts/MyWorkouts';
import { useState } from 'react';
import { Modal } from '../../components/Modals/Modal';
import { Drawer } from '../../components/Drawer/Drawer';
import { AiOutlinePlus } from 'react-icons/ai';
import { FiChevronLeft, FiMoreHorizontal } from 'react-icons/fi';
import { MuscleGroupList } from '../../components/List/Exercise/MuscleGroupList';
import { useGlobalContext } from '../../state/context/global.context';
import { ExerciseList } from '../../components/List/Exercise/ExerciseList';
import { WorkoutList } from '../../components/List/Workout/WorkoutList';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface WorkoutPageProps {}

const WorkoutPage: NextPage<WorkoutPageProps> = () => {
  const { data: user } = useGetCurrentUserQuery<GetCurrentUserQuery>();
  const {
    selectedMuscleGroup,
    setSelectedMuscleGroup,
    workoutExercises,
    setWorkoutExercises,
    setIsAddExerciseOpen,
    setIsAddWorkoutModalOpen,
    isAddExerciseOpen,
    isAddWorkoutModalOpen,
  } = useGlobalContext();

  const { refetch: refetchUsersWorkouts } =
    useGetUsersWorkoutsQuery<GetUsersWorkoutsQuery>();

  const { mutate } = useCreateWorkoutMutation({
    onSuccess: () => {
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


  const [workout, setWorkout] = useState({
    name: '',
    startDate: new Date(),
    endDate: new Date(),
    bodyWeight: null,
    notes: '',
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
      startTime: moment(workout.startDate).toISOString(),
      endTime: moment(workout.endDate).toISOString(),
      bodyweight: workout.bodyWeight,
      notes: workout.notes,
      exercises: workoutExercises,
    });
  }

  function handleAddExercise() {
    setIsAddExerciseOpen(!isAddExerciseOpen);
  }

  const handleCreateNewWorkout = () => {
    setWorkoutExercises([])
    setIsAddWorkoutModalOpen(true)
  }

  if (user?.getCurrentUser?.data?.id) {
    return (
      <>
        <Head>
          <title>Workouts | VitaTrack</title>
          <meta
            name="description"
            content="VitaTrack is a one stop shop to track all of your nutrition and gym performance."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="relative min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white">
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <div className="flex h-screen w-full">
            <SidebarNav />
            <main className="w-full">
              <Navbar />
              <div className="p-8">
                <section>
                  <MyWorkouts />
                </section>
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
                              <DatePicker
                                selected={workout.startDate}
                                // selected={moment(data.startTime) || moment()}
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
                              <DatePicker
                                selected={workout.endDate}
                                // selected={moment("September 6th, 2022 10:22 AM", 'MMMM Do, yyyy h:mm aa').toDate() || workout.endDate}
                                // selected={moment(data.endTime) || moment()}
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
                            workout.name.length === 0 ||
                            workoutExercises.length === 0
                          }
                          className={`${
                            workout.name.length === 0 ||
                            workoutExercises.length === 0
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
                        <h4 className="text-xl font-bold">
                          {selectedMuscleGroup}
                        </h4>
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
              <button
                onClick={handleCreateNewWorkout}
                title="Add Workout"
                className="fixed z-90 bottom-10 right-8 bg-brand-green w-16 h-16  rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-brand-green-hover "
              >
                <AiOutlinePlus size={45} color="white" />
              </button>
            </main>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Workouts | VitaTrack</title>
        <meta
          name="description"
          content="VitaTrack is a one stop shop to track all of your nutrition and gym performance."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-white relative">
        <h1 className="text-6xl ">You must log in!</h1>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookie = context.req.cookies['refreshToken'];

  if (!cookie) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    useGetCurrentUserQuery.getKey(),
    useGetCurrentUserQuery.fetcher(
      undefined,
      context.req.headers as Record<string, string>
    )
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default WorkoutPage;
