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
import Image from 'next/image';
import { Avatar } from '../Avatar/Avatar';

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = () => {
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
                  className={`bg-gray-400 h-[2px] w-7 transform transition-all duration-300 origin-left ${
                    isSidebarOpen && 'w-2/3 rotate-[42deg]'
                  } delay-150`}
                ></div>
                <div
                  className={`bg-gray-400 h-[2px] w-7 rounded transform transition-all duration-300 ${
                    isSidebarOpen && 'translate-x-10'
                  }`}
                ></div>
                <div
                  className={`bg-gray-400 h-[2px] w-7 transform transition-all duration-300 origin-left ${
                    isSidebarOpen && 'w-2/3 -rotate-[42deg]'
                  } delay-150`}
                ></div>
              </div>
            </div>
          </button>
        </div>
        <div className="flex md:order-2 items-center space-x-16 ">
          <div className="flex items-center space-x-6">
            {/* <button
              type="button"
              className="inline-flex relative items-center p-2 text-sm font-medium text-center text-white bg-[#f4f4ff] rounded-full hover:bg-gray-200 focus:ring focus:outline-none focus:ring-brand-green"
            >
              <IoMdNotificationsOutline className=" text-gray-600" size={23} />
              <span className="sr-only">Notifications</span>
              <div className="inline-flex absolute -top-2 -right-1.5 justify-center items-center w-6 h-6 text-xs text-white bg-red-500 rounded-full border-2 border-white">
                6
              </div>
            </button> */}
            <div className="flex items-center space-x-1">
              <div className="flex items-center">
                <Avatar
                  className="w-9 h-9 rounded-full"
                  avatarUrl={data?.getCurrentUser?.data?.profile?.avatar}
                  alt="Avatar"
                  width={36}
                  height={36}
                />
              </div>
              <p className="font-bold pl-1">
                {data?.getCurrentUser?.data?.username}
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
