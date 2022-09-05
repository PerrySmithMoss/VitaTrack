import { dehydrate, QueryClient } from '@tanstack/react-query';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar/Navbar';
import { SidebarNav } from '../../components/SidebarNav/SidebarNav';
import {
  GetCurrentUserQuery,
  useGetCurrentUserQuery,
} from '../../graphql/generated/graphql';
import { MyWorkouts } from '../../components/Account/Dashboard/MyWokouts/MyWorkouts';
import { useState } from 'react';
import { Modal } from '../../components/Modals/Modal';
import { Drawer } from '../../components/Drawer/Drawer';
import { AiOutlinePlus, AiOutlineHistory, AiOutlineStar } from 'react-icons/ai';
import { BsBarChartFill, BsBarChartLine } from 'react-icons/bs';
import {
  FiChevronLeft,
  FiMoreHorizontal,
  FiMoreVertical,
} from 'react-icons/fi';
import { MuscleGroupList } from '../../components/List/Exercise/MuscleGroupList';
import { useGlobalContext } from '../../context/global.context';
import { ExerciseList } from '../../components/List/Exercise/ExerciseList';
import { WorkoutList } from '../../components/List/Workout/WorkoutList';

interface DashboardPageProps {}

const DashboardPage: NextPage<DashboardPageProps> = () => {
  const { data, refetch: refetchCurrentUser } =
    useGetCurrentUserQuery<GetCurrentUserQuery>();

  const { selectedMuscleGroup, setSelectedMuscleGroup, workoutExercises } =
    useGlobalContext();

  const [isAddExerciseOpen, setIsAddExerciseOpen] = useState(false);

  const [isAddWorkoutModalOpen, setIsAddWorkoutModalOpen] = useState(false);
  const [workout, setWorkout] = useState({
    name: '',
    type: 'Strength' || 'Cardio',
    startDate: new Date(),
    endDate: new Date(),
    bodyWeight: 0,
    notes: '',
  });
  const [exercises, setExercises] = useState([]);

  // const showToastSuccess = () => {
  //     toast.success("User avatar updated successfully", {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //     });
  //   };

  const handleAddExercise = () => {
    setIsAddExerciseOpen(!isAddExerciseOpen);
  };

  console.log('workoutExercises: ', workoutExercises);

  if (data?.getCurrentUser?.data?.id) {
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
                    <div className="overflow-y-scroll h-[550px] w-full">
                      <section className="w-full flex flex-col mb-4 bg-gray-100">
                        <div className="">
                          <input
                            type="text"
                            placeholder="Name"
                            className="block border-t bg-transparent py-3 px-4  w-full outline-none"
                          />
                          <div className="mx-4">
                            <hr />
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 ">
                            <div>
                              <input
                                type="text"
                                placeholder="Start Time"
                                className="block border-l bg-transparent py-3 px-4 w-full outline-none"
                              />
                            </div>
                            <div>
                              <input
                                type="text"
                                placeholder="End Time"
                                className="block border-l bg-transparent py-3 px-4 w-full outline-none"
                              />
                            </div>
                          </div>
                          <div className="mx-4">
                            <hr />
                          </div>
                          <input
                            type="text"
                            placeholder="Bodyweight"
                            className="block   bg-transparent py-3 px-4 w-full outline-none"
                          />
                          <div className="mx-4">
                            <hr />
                          </div>
                          <input
                            type="text"
                            placeholder="Notes"
                            className="block border-b bg-transparent py-3 px-4 w-full outline-none"
                          />
                        </div>
                      </section>
                      <WorkoutList />
                      <div className="mx-5">
                        <button
                          onClick={handleAddExercise}
                          className="rounded w-full py-2 bg-brand-green hover:bg-brand-green-hover text-white focus:shadow-outline focus:outline-none"
                        >
                          Add Exercise
                        </button>
                      </div>
                      <footer className="flex justify-end px-8 pb-6 pt-8">
                        <button
                          id="submit"
                          className="rounded px-5 py-1.5 text-gray-800 bg-gray-100 hover:bg-gray-200  focus:shadow-outline focus:outline-none"
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
                onClick={() => setIsAddWorkoutModalOpen(true)}
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
  const { cookie } = context.req.headers;
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

export default DashboardPage;
