import { createContext, useContext, useState } from 'react';

type GlobalProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedMuscleGroup: string;
  setSelectedMuscleGroup: React.Dispatch<React.SetStateAction<string>>;
  workoutExercises: [];
  setWorkoutExercises: React.Dispatch<React.SetStateAction<any>>;
  isAddExerciseOpen: boolean;
  setIsAddExerciseOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAddWorkoutModalOpen: boolean;
  setIsAddWorkoutModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const GlobalContext = createContext<GlobalProps>({
  isSidebarOpen: false,
  setIsSidebarOpen: () => {},
  selectedMuscleGroup: '',
  setSelectedMuscleGroup: () => {},
  workoutExercises: [],
  setWorkoutExercises: () => {},
  isAddExerciseOpen: false,
  setIsAddExerciseOpen: () => {},
  isAddWorkoutModalOpen: false,
  setIsAddWorkoutModalOpen: () => {},
});

export const GlobalContextProvider = ({
  children,
}: React.PropsWithChildren<unknown>) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState('');
  const [workoutExercises, setWorkoutExercises] = useState<any>([]);
  const [isAddExerciseOpen, setIsAddExerciseOpen] = useState(false);
  const [isAddWorkoutModalOpen, setIsAddWorkoutModalOpen] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
        selectedMuscleGroup,
        setSelectedMuscleGroup,
        workoutExercises,
        setWorkoutExercises,
        isAddExerciseOpen,
        setIsAddExerciseOpen,
        isAddWorkoutModalOpen,
        setIsAddWorkoutModalOpen,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Export useContext Hook.
export function useGlobalContext() {
  return useContext(GlobalContext);
}
