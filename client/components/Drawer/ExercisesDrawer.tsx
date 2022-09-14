import React from 'react';

interface ExercisesDrawerProps {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
}

export const ExercisesDrawer: React.FC<ExercisesDrawerProps> = ({
  children,
  isOpen,
  setIsOpen,
}) => {
  return (
    <div
      className={
        'fixed overflow-hidden z-50 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out' +
        (isOpen
          ? ' transition-opacity opacity-100 duration-500 translate-x-0'
          : ' transition-all delay-500 opacity-0 translate-x-full')
      }
    >
      <section
        className={
          'w-screen max-w-sm right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  ' +
          (isOpen ? ' translate-x-0 ' : ' translate-x-full ')
        }
      >
        <article className="relative w-screen max-w-sm pb-10 flex flex-col space-y-6 overflow-y-auto h-full">
          {/* <header className="font-bold text-xl">{title}</header> */}
          {children}
        </article>
      </section>
      <section
        className="w-screen h-full cursor-pointer "
        onClick={() => {
          setIsOpen(false);
        }}
      ></section>
    </div>
  );
};