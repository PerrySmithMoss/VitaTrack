import React from 'react';
import { useGlobalContext } from '../../state/context/global.context';
import { Logo } from '../../components/Svgs/Logo/Logo';
import { MdTrendingUp, MdOutlineSettings, MdLogout } from 'react-icons/md';
import { TbMeat } from 'react-icons/tb';
import { HiOutlineHome } from 'react-icons/hi';
import { CgGym, CgProfile } from 'react-icons/cg';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface SidebarNavProps {}

export const SidebarNav: React.FC<SidebarNavProps> = ({}) => {
  const { isSidebarOpen } = useGlobalContext();

  const router = useRouter();
  return (
    <aside
      className={`bg-white border-gray-200 border-r flex flex-col h-full p-5 pt-5 ${
        isSidebarOpen ? 'w-60' : 'w-20'
      } duration-300 relative`}
    >
      {/* <div>
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
        </div> */}
      {/* <BsArrowLeftShort
      className={`bg-white text-brand-green text-3xl rounded-full absolute -right-3 top-16 border border-brand-green cursor-pointer ${
        !isSidebarOpen && 'rotate-180'
      }`}
      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
    /> */}
      {/* Logo */}
      <div className="flex items-center space-x-2 cursor-pointer">
        <div
          className={`float-left ml-1.5 duration-500 ${
            isSidebarOpen && 'rotate-[360]'
          }`}
        >
          <Logo width={30} height={36} />
        </div>
        <div>
          <h1
            className={`origin-left font-bold text-2xl duration-300 ${
              !isSidebarOpen && 'scale-0'
            }`}
          >
            VitaTrack
          </h1>
        </div>
      </div>
      {/* Search bar */}
      {/* <div
        className={`flex items-center cursor-pointer rounded-md bg-gray-100 hover:bg-gray-300 mt-6 ${
          !isSidebarOpen ? 'px-2.5' : 'px-4'
        } py-2`}
        onClick={() => !isSidebarOpen && setIsSidebarOpen(true)}
      >
        <BsSearch
          className={`text-lg block float-left ${isSidebarOpen && 'mr-2'} `}
        />
        <input
          type="search"
          placeholder="Search..."
          className={`text-base bg-transparent w-full focus:outline-none ${
            !isSidebarOpen && 'hidden'
          }`}
        />
      </div> */}
      {/* Links */}
      <ul className="flex h-full flex-col  flex-1 mt-4">
        {menuLinks.map((link, index) => (
          <li
            key={index}
            className={`text-sm flex items-center gap-x-4 cursor-pointer ${
              router.pathname === link.link
                ? 'bg-brand-green text-white hover:bg-brand-green-hover'
                : 'text-gray-500  hover:bg-gray-200'
            } p-2 rounded-md ${
              index === menuLinks.length - 1 ? 'mt-auto' : 'mt-4'
            }`}
          >
            {link.link !== null ? (
              <Link href={link.link}>
                <a className="flex items-center space-x-2.5">
                  <span className="text-2xl block float-left">
                    <link.icon />
                  </span>
                  <span
                    className={`text-base font-medium ${
                      router.pathname === link.link
                        ? 'text-white'
                        : 'text-gray-700'
                    } flex-1 duration-300 ${!isSidebarOpen && 'hidden'}`}
                  >
                    {link.text}
                  </span>
                </a>
              </Link>
            ) : (
              <>
                <span className="text-2xl block float-left">
                  <link.icon />
                </span>
                <span
                  className={`text-base font-medium text-gray-700 flex-1 duration-300 ${
                    !isSidebarOpen && 'hidden'
                  }`}
                >
                  {link.text}
                </span>
              </>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

const menuLinks = [
  {
    icon: HiOutlineHome,
    text: 'Dashboard',
    link: '/account/dashboard',
  },
  {
    icon: CgGym,
    text: 'Workouts',
    link: '/account/workouts',
  },
  {
    icon: TbMeat,
    text: 'Nutrition',
    link: '/account/nutrition',
  },
  {
    icon: MdTrendingUp,
    text: 'Progress',
    link: '/account/progress',
  },
  {
    icon: CgProfile,
    text: 'Profile',
    link: '/account/profile',
  },
  {
    icon: MdOutlineSettings,
    text: 'Settings',
    link: '/account/settings',
  },
  {
    icon: MdLogout,
    text: 'Logout',
    link: null,
  },
];
