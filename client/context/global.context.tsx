import { createContext, useContext, useState } from 'react';

type GlobalProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedMuscleGroup: string;
  setSelectedMuscleGroup: React.Dispatch<React.SetStateAction<string>>;
  workoutExercises: [];
  setWorkoutExercises: React.Dispatch<React.SetStateAction<any>>;
};

const GlobalContext = createContext<GlobalProps>({
  isSidebarOpen: false,
  setIsSidebarOpen: () => {},
  selectedMuscleGroup: '',
  setSelectedMuscleGroup: () => {},
  workoutExercises: [],
  setWorkoutExercises: () => {},
});

export const GlobalContextProvider = ({
  children,
}: React.PropsWithChildren<unknown>) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState('');
  const [workoutExercises, setWorkoutExercises] = useState<any>([]);

  return (
    <GlobalContext.Provider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
        selectedMuscleGroup,
        setSelectedMuscleGroup,
        workoutExercises,
        setWorkoutExercises,
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
