import { createContext, useContext, useState } from 'react';

type GlobalProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const GlobalContext = createContext<GlobalProps>({
  isSidebarOpen: false,
  setIsSidebarOpen: () => {},
});

export const GlobalContextProvider = ({
  children,
}: React.PropsWithChildren<unknown>) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
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
