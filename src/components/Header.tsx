import React from "react";
import { IoMenu, IoCloseSharp } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { navMenu } from "../staticData";
import { IElementProps } from "../types/propType";
import { Link } from "react-router-dom";

export const Header = ({ isAuthenticated }: IElementProps): JSX.Element => {
  const [openNav, setOpenNav] = React.useState<boolean>(false);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setOpenNav(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setOpenNav]);

  const PublicNavbarButton = () => {
    return (
      <div>
        <button className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200">
          <a href="/hire-me">Hire Me</a>
        </button>
      </div>
    );
  };
  const PublicNavButtonMobile = () => {
    return (
      <div className="pt-6">
        <a
          className="block px-4 py-3 mb-3 text-xs text-center font-semibold leading-none bg-gray-50 hover:bg-gray-100 rounded-xl"
          href="/hire-me"
        >
          Hire Me
        </a>
      </div>
    );
  };
  const PrivateNavbarButton = () => {
    return (
      <div className="hidden lg:block cursor-pointer ">
        <MdAccountCircle size={30} />
      </div>
    );
  };

  const navItems = navMenu;
  return (
    <nav className="bg-white lg:shadow-lg fixed inset-x-0 z-10" id="nav-bar">
      <div className="container lg:max-w-[80%] mx-auto relative p-4 flex justify-between items-center">
        {/* logo */}
        <a
          href=""
          className={`text-xl font-bold leading-none ${
            openNav ? "hidden" : ""
          }`}
        >
          <h1>Ricky Cloudy</h1>
        </a>
        <div
          onClick={() => setOpenNav(!openNav)}
          className="text-3xl absolute right-8 top-3 cursor-pointer lg:hidden"
        >
          <div></div>
          {openNav ? <></> : <IoMenu />}
        </div>
        {/* main nav */}
        <ul className="hidden lg:flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:mx-auto lg:items-center lg:w-auto lg:space-x-6">
          {navItems.map((item) => (
            <li key={item.name.toString()}>
              <a
                href={item.link}
                className="text-sm font-epilogue text-gray-600 hover:text-blue-600"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
        <div>
          {!isAuthenticated ? <PublicNavbarButton /> : <PrivateNavbarButton />}
        </div>

        <nav
          className={`fixed top-0 right-0 flex flex-col w-[70%] sm:w-1/2 md:w-1/3 h-full py-6 px-6 bg-blue-600 ${
            openNav ? "translate-x-0" : "translate-x-full"
          } ease-in-out duration-300`}
          id="mobile-menu"
        >
          <div className="flex relative items-center mb-8 text-xl">
            <a href="" className="font-bold leading-none">
              <h1>Ricky Cloudy</h1>
            </a>
            <div
              onClick={() => setOpenNav(!openNav)}
              className="text-2xl absolute right-0 cursor-pointer"
            >
              <IoCloseSharp />
            </div>
          </div>
          <div>
            <ul>
              {isAuthenticated ? (
                <li key={"dashboard"}>
                  <Link
                    to="/dashboard"
                    className="block p-4 text-sm font-epilogue text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                    onClick={() => setOpenNav(false)}
                  >
                    Dashboard
                  </Link>
                </li>
              ) : (
                ""
              )}
              {navItems.map((item) => (
                <li key={item.name.toString()} className="mb-1">
                  <Link
                    to={item.link}
                    className="block p-4 text-sm font-epilogue text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                    onClick={() => setOpenNav(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-auto">
            {!isAuthenticated ? <PublicNavButtonMobile /> : ""}
            <p className="my-4 text-xs text-center text-gray-400">
              <span>Copyright © 2021</span>
            </p>
          </div>
        </nav>
      </div>
    </nav>
  );
};
