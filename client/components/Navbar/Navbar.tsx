import React from 'react';
import { Logo } from '../Svgs/Logo/Logo';
import { IoMdNotificationsOutline } from 'react-icons/io';
import {
  GetCurrentUserQuery,
  useGetCurrentUserQuery,
  useLogoutUserMutation,
} from '../../graphql/generated/graphql';
import { useGlobalContext } from '../../state/context/global.context';
import { useRouter } from 'next/router';

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const { isSidebarOpen, setIsSidebarOpen } = useGlobalContext();
  const { data, refetch: refetchCurrentUser } =
    useGetCurrentUserQuery<GetCurrentUserQuery>();
  const router = useRouter();

  const pageName = router.pathname.replace('/account/', '');

  return (
    <nav className="border-gray-200 border-b w-full  pl-2 pr-5 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="relative group"
          >
            <div
              className={`relative flex overflow-hidden items-center justify-center rounded-full w-[30px] h-[30px] transform transition-all duration-200`}
            >
              <div
                className={`flex flex-col justify-between w-[16px] h-[16px] transform transition-all duration-300 origin-center overflow-hidden ${
                  isSidebarOpen && '-translate-x-1.5 rotate-180'
                }`}
              >
                <div
                  className={`bg-gray-500 h-[2px] w-7 transform transition-all duration-300 origin-left ${
                    isSidebarOpen && 'w-2/3 rotate-[42deg]'
                  } delay-150`}
                ></div>
                <div
                  className={`bg-gray-500 h-[2px] w-7 rounded transform transition-all duration-300 ${
                    isSidebarOpen && 'translate-x-10'
                  }`}
                ></div>
                <div
                  className={`bg-gray-500 h-[2px] w-7 transform transition-all duration-300 origin-left ${
                    isSidebarOpen && 'w-2/3 -rotate-[42deg]'
                  } delay-150`}
                ></div>
              </div>
            </div>
          </button>
          {/* <h1 className="ml-5 text-4xl font-bold text-[#2b3042]">{pageName[0].toUpperCase() + pageName.slice(1).toLowerCase()}</h1> */}
        </div>
        {/* <a href="#" className="flex items-center space-x-1">
          <Logo height={28} width={34} />
          <span className="self-center text-xl font-semibold whitespace-nowrap">
            Vitatrack
          </span>
        </a> */}
        <div className="flex md:order-2 items-center space-x-16 ">
          <div className="flex items-center space-x-6">
            <button
              type="button"
              className="inline-flex relative items-center p-2 text-sm font-medium text-center text-white bg-[#f4f4ff] rounded-full hover:bg-gray-200 focus:ring focus:outline-none focus:ring-brand-green"
            >
              <IoMdNotificationsOutline className=" text-gray-600" size={23} />
              <span className="sr-only">Notifications</span>
              <div className="inline-flex absolute -top-2 -right-1.5 justify-center items-center w-6 h-6 text-xs text-white bg-red-500 rounded-full border-2 border-white">
                6
              </div>
            </button>
            <div className="flex items-center space-x-1">
              <div className="flex items-center">
                <img
                  className="w-9 h-9 rounded-full"
                  src={data?.getCurrentUser?.data?.profile?.avatar as string}
                  alt="Avatar"
                />
              </div>
              {/* <p className="font-medium ">
              {data?.getCurrentUser?.data?.username}
            </p> */}
            </div>
          </div>
          <button
            data-collapse-toggle="mobile-menu-3"
            type="button"
            className="md:hidden text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg inline-flex items-center justify-center"
            aria-controls="mobile-menu-3"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <svg
              className="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div className="relative mx-3 md:mr-0 hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
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
            id="email-adress-icon"
            className=" bg-[#f5f9fd] text-gray-900 sm:text-sm rounded-full focus:ring-brand-green focus:border-brand-green block w-80 pl-10 py-3 px-3"
            placeholder="Search..."
          />
        </div>
      </div>
    </nav>
  );
};
