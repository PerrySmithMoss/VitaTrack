import React from 'react';
import { useGlobalContext } from '../../state/context/global.context';
import { Logo } from '../../components/Svgs/Logo/Logo';
import { MdLogout } from 'react-icons/md';
import { TbMeat } from 'react-icons/tb';
import { HiOutlineHome } from 'react-icons/hi';
import { CgGym, CgProfile } from 'react-icons/cg';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useLogoutUserMutation } from '../../graphql/generated/graphql';

interface SidebarNavProps {}

export const SidebarNav: React.FC<SidebarNavProps> = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useGlobalContext();
  const router = useRouter();

  const { mutate: logoutUser } = useLogoutUserMutation({
    onSuccess: () => router.push('/'),
  });

  const handleLogoutUser = () => {
    logoutUser({});
  };

  return (
    <>
      {/* Mobile */}
      <aside
        className={
          `fixed md:hidden overflow-hidden z-50 inset-0 transform ease-in-out bg-gray-900 bg-opacity-40
        ` +
          (isSidebarOpen
            ? ' transition-opacity opacity-100 duration-500 translate-x-0'
            : ' transition-all delay-500 opacity-0 -translate-x-full')
        }
      >
        <section
          className={
            `w-screen left-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform 
          max-w-[270px] xs:max-w-[370px]
             ` + (isSidebarOpen ? ' translate-x-0 ' : '-translate-x-full ')
          }
        >
          <article
            className={`relative w-screen pb-10 flex flex-col space-y-6 overflow-y-auto h-full max-w-[270px] xs:max-w-[370px]`}
          >
            <div className="p-3">
              <div className="flex items-center space-x-2 cursor-pointer px-2 pt-3">
                <div
                  className={`float-left duration-500 ${
                    isSidebarOpen && 'rotate-[360]'
                  }`}
                >
                  <Logo width={36} height={40} />
                </div>
                <div>
                  <h1
                    className={`origin-left font-bold text-3xl duration-300 ${
                      !isSidebarOpen && 'scale-0'
                    }`}
                  >
                    VitaTrack
                  </h1>
                </div>
              </div>
              <ul className="flex h-full flex-col  flex-1 mt-5">
                {menuLinks.map((link, index) => (
                  <li
                    key={index}
                    className={`text-sm flex items-center gap-x-5 cursor-pointer ${
                      router.pathname === link.link
                        ? 'bg-brand-green text-white hover:bg-brand-green-hover'
                        : 'text-gray-500  hover:bg-gray-200'
                    } p-4 rounded-md mt-3`}
                  >
                    {link.link !== null ? (
                      <Link href={link.link}>
                        <div className="flex items-center space-x-2.5">
                          <span className="text-2xl block float-left">
                            <link.icon />
                          </span>
                          <span
                            className={`text-base font-medium ${
                              router.pathname === link.link
                                ? 'text-white'
                                : 'text-gray-700'
                            } flex-1 duration-300 ${
                              !isSidebarOpen && 'hidden'
                            }`}
                          >
                            {link.text}
                          </span>
                        </div>
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
                <li
                  className={`text-sm flex items-center gap-x-4 cursor-pointer rounded-md mt-3 p-4 text-gray-500 hover:bg-gray-200`}
                >
                  <button
                    onClick={handleLogoutUser}
                    className="flex items-center space-x-2.5"
                  >
                    <span className="text-2xl block float-left">
                      <MdLogout />
                    </span>
                    <span
                      className={`text-base font-medium text-gray-700
              flex-1 duration-300 ${!isSidebarOpen && 'hidden'}`}
                    >
                      Logout
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </article>
        </section>
        <section
          className="w-screen h-full cursor-pointer "
          onClick={() => {
            setIsSidebarOpen(false);
          }}
        ></section>
      </aside>

      {/* Desktop */}
      <aside
        className={`hidden md:flex bg-white border-gray-200 border-r  flex-col h-full p-5 pt-5 ${
          isSidebarOpen ? 'w-60' : 'w-20'
        } duration-300 relative`}
      >
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
        <ul className="flex h-full flex-col  flex-1 mt-4">
          {menuLinks.map((link, index) => (
            <li
              key={index}
              className={`text-sm flex items-center gap-x-4 cursor-pointer ${
                router.pathname === link.link
                  ? 'bg-brand-green text-white hover:bg-brand-green-hover'
                  : 'text-gray-500  hover:bg-gray-200'
              } p-2 rounded-md mt-4`}
            >
              {link.link !== null ? (
                <Link href={link.link}>
                  <div className="flex items-center space-x-2.5">
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
                  </div>
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
          <li
            className={`text-sm flex items-center gap-x-4 cursor-pointer p-2 rounded-md mt-auto text-gray-500 hover:bg-gray-200`}
          >
            <button
              onClick={handleLogoutUser}
              className="flex items-center space-x-2.5"
            >
              <span className="text-2xl block float-left">
                <MdLogout />
              </span>
              <span
                className={`text-base font-medium text-gray-700
              flex-1 duration-300 ${!isSidebarOpen && 'hidden'}`}
              >
                Logout
              </span>
            </button>
          </li>
        </ul>
      </aside>
    </>
  );
};

const menuLinks = [
  {
    icon: HiOutlineHome,
    text: 'Dashboard',
    link: '/account/dashboard',
  },
  {
    icon: TbMeat,
    text: 'Nutrition',
    link: '/account/nutrition',
  },
  {
    icon: CgGym,
    text: 'Workouts',
    link: '/account/workouts',
  },
  // {
  //   icon: MdTrendingUp,
  //   text: 'Progress',
  //   link: '/account/progress',
  // },
  {
    icon: CgProfile,
    text: 'Profile',
    link: '/account/profile',
  },
  // {
  //   icon: MdOutlineSettings,
  //   text: 'Settings',
  //   link: '/account/settings',
  // },
];
