import { FaGithub, FaInstagram } from "react-icons/fa6";
import { navMenu, otherResourcesFooter } from "../staticData";

const Footer = (): JSX.Element => {
  return (
    <footer className="bg-blueGray-200 pt-8 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex lg:text-left lg:flex-wrap">
          <div className="w-full lg:w-1/2 px-4">
            <h4 className="text-2xl fonat-semibold text-blueGray-700">
              Let's keep in touch!
            </h4>
            <h5 className="text-lg mt-0 mb-2 text-blueGray-600">
              Find us on any of these platforms.
            </h5>
            <div className="mt-6 lg:mb-0 mb-6 ml-3">
              <ul className="flex flex-row space-x-7 text-2xl">
                <li className="shadow-md">
                  <a
                    className="text-gray-700 transition hover:opacity-75"
                    href="https://github.com/CloudyRick"
                  >
                    <FaGithub />
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-700 transition hover:opacity-75"
                    href="https://www.instagram.com/rckychydii/"
                  >
                    <FaInstagram />
                  </a>
                </li>
                {/* <li>
                  <a
                    className="text-gray-700 transition hover:opacity-75"
                    href=""
                  >
                    <FaLinkedinIn />
                  </a>
                </li> */}
              </ul>
            </div>
          </div>
          <div className="w-full lg:w-1/2 px-4">
            <div className="flex flex-wrap items-top mb-6">
              <div className="w-full lg:w-1/3 px-4 ml-auto">
                <span className="block uppercase text-gray-800 text-sm font-semibold mb-2">
                  Usefull links
                </span>
                <ul className="list-unstyled">
                  {navMenu.map((item) => (
                    <li key={item.id}>
                      <a
                        className="text-gray-600 hover:text-gray-800 font-semibold block pb-2 text-sm"
                        href={item.link}
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full lg:w-1/3 px-4 ml-auto">
                <span className="block uppercase text-gray-800 text-sm font-semibold mb-2">
                  Other Resources
                </span>
                <ul className="list-unstyled">
                  {otherResourcesFooter.map((item) => (
                    <li key={item.id}>
                      <a
                        className="text-gray-600 hover:text-gray-800 font-semibold block pb-2 text-sm"
                        href={item.link}
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-blueGray-300" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-blueGray-500 font-semibold py-1">
              Copyright © <span id="get-current-year">2021</span>
              <a
                href=""
                className="text-blueGray-500 hover:text-gray-800"
                target="_blank"
              >
                {" "}
                Created by{" "}
              </a>
              <a
                href=""
                className="text-blueGray-500 hover:text-blueGray-800"
              ></a>
              .
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
