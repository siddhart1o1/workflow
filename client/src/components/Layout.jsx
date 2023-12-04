import { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, Menu, Transition } from "@headlessui/react";
import axios from "axios";
import {
  HomeIcon,
  XCircleIcon,
  Bars3BottomLeftIcon,
  TrophyIcon,
  PlusIcon,
  PencilIcon,
  UserGroupIcon,
  CalendarIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import DynamicHeroIcon from "./DynamicSVG";

// import Search from "./Navbar";
import { Outlet } from "react-router-dom";
import Navbar from "./Navabar";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Layout() {
  const navigate = useNavigate();
  const [menu, set_menu] = useState([
    {
      name: "home",
      // current: location.pathname === "report",
      topic_icon: "HomeIcon",
    },
    {
      name: "report",
      // current: location.pathname === "report",
      topic_icon: "ChartBarSquareIcon",
    },
    {
      name: "blogs",
      topic_icon: "UserGroupIcon",
    },
    {
      name: "calender",
      topic_icon: "CalendarIcon",
    },
  ]);
  var a = sessionStorage.getItem("userDetails");
  if (!a) {
    navigate("/login");
  }
  useEffect(() => {
    axios
      .get("/topic-subtopic/get")
      .then((res) => {
        let updated = [...menu, ...res.data.TopicsandSubtopics];
        set_menu(updated);
      })
      .catch((err) => console.log(err));
  }, []);
  // console.log(menu);
  // const navigation = [
  //   {
  //     name: "Dashboard",
  //     href: "/home",
  //     icon: HomeIcon,
  //     current: location.pathname === "/home",
  //   },
  //   {
  //     name: "Aptitude",
  //     href: "/aptitude",
  //     icon: PencilIcon,
  //     current: location.pathname === "/aptitude",
  //   },
  //   {
  //     name: "Reasoning",
  //     href: "/reasoning",
  //     icon: QuestionMarkCircleIcon,
  //     current: location.pathname === "/reasoning",
  //   },
  //   {
  //     name: "Technical",
  //     href: "/technical",
  //     icon: ComputerDesktopIcon,
  //     current: location.pathname === "/technical",
  //   },
  //   {
  //     name: "Verbal",
  //     href: "/verbal",
  //     icon: GlobeAsiaAustraliaIcon,
  //     current: location.pathname === "/verbal",
  //   },
  //   {
  //     name: "Reports",
  //     href: "/report",
  //     icon: ChartBarIcon,
  //     current: location.pathname === "/report",
  //   },
  // ];
  const interviewer_nav = [
    {
      name: "Home",
      href: "/home",
      icon: HomeIcon,
      current: location.pathname === "/home",
    },
    {
      name: "Scoreboard",
      href: "/scoreboard",
      icon: TrophyIcon,
      current: location.pathname === "/scoreboard",
    },
    {
      name: "Add",
      href: "/add",
      icon: PlusIcon,
      current: location.pathname === "/add",
    },
    {
      name: "Edit",
      href: "/edit",
      icon: PencilIcon,
      current: location.pathname === "/edit",
    },
    {
      name: "Blogs",
      href: "/blogs",
      icon: UserGroupIcon,
      current: location.pathname === "/blogs",
    },
    {
      name: "Calender",
      href: "/calender",
      icon: CalendarIcon,
      current: location.pathname === "/calender",
    },
    {
      name: "Invite",
      href: "/invite",
      icon: UserPlusIcon,
      current: location.pathname === "/invite",
    },
  ];
  const details = JSON.parse(sessionStorage.getItem("userDetails"));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <div className=" bg-gray-100">
        <div className=" h-full">
          <div>
            <Transition.Root show={sidebarOpen} as={Fragment}>
              <Dialog
                as="div"
                className="fixed inset-0 z-40 flex md:hidden"
                onClose={setSidebarOpen}
              >
                <Transition.Child
                  as={Fragment}
                  enter="transition-opacity ease-linear duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity ease-linear duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                </Transition.Child>
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <div className="relative max-w-xs w-full bg-white pt-5 pb-4 flex-1 flex flex-col">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-300"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute top-0 right-0 -mr-12 pt-2">
                        <button
                          type="button"
                          className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                          onClick={() => setSidebarOpen(false)}
                        >
                          <span className="sr-only">Close sidebar</span>
                          <XCircleIcon
                            className="h-6 w-6 text-white"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="flex-shrink-0 px-4 flex items-center">
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                        alt="Workflow"
                      />
                    </div>
                    <div className="mt-5 flex-1 h-0 overflow-y-auto">
                      <nav className="px-2 space-y-1">
                        {details && details.user.role === "Interviewer" ? (
                          <>
                            {interviewer_nav.map((item) => (
                              <a
                                key={item.name}
                                href={item.href}
                                className={classNames(
                                  item.current
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                                  "group rounded-md py-2 px-2 flex items-center text-sm font-medium"
                                )}
                              >
                                <item.icon
                                  className={classNames(
                                    item.current
                                      ? "text-gray-500"
                                      : "text-gray-400 group-hover:text-gray-500",
                                    "mr-3 flex-shrink-0 h-6 w-6"
                                  )}
                                  aria-hidden="true"
                                />
                                {item.name}
                              </a>
                            ))}
                          </>
                        ) : (
                          <>
                            {menu.map((item) => (
                              <a
                                key={item.name}
                                href={`/${item.name}`}
                                className={classNames(
                                  item.current
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                                  "group rounded-md py-2 px-2 flex items-center text-sm font-medium"
                                )}
                              >
                                <DynamicHeroIcon
                                  icon={item.topic_icon}
                                  className={classNames(
                                    item.current
                                      ? "text-gray-500"
                                      : "text-gray-400 group-hover:text-gray-500",
                                    " mr-3  flex-shrink-0 h-6 w-6"
                                  )}
                                  aria-hidden="true"
                                />
                                <span className=" ml-3">
                                  {item.name.charAt(0).toUpperCase() +
                                    item.name.slice(1)}{" "}
                                </span>
                              </a>
                            ))}
                          </>
                        )}
                      </nav>
                    </div>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 w-14">
                  {/* Dummy element to force sidebar to shrink to fit close icon */}
                </div>
              </Dialog>
            </Transition.Root>

            {/* Static sidebar for desktop */}
            <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="border-r border-gray-200 pt-5 flex flex-col flex-grow bg-white overflow-y-auto">
                <div className="flex-shrink-0 px-4 flex items-center">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                    alt="Workflow"
                  />
                </div>
                <div className="flex-grow mt-5 flex flex-col">
                  <nav className="flex-1 px-2 pb-4 space-y-1">
                    {details && details.user.role === "Interviewer" ? (
                      <>
                        {interviewer_nav.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                              "group rounded-md py-2 px-2 flex items-center text-sm font-medium"
                            )}
                          >
                            <item.icon
                              className={classNames(
                                item.current
                                  ? "text-gray-500"
                                  : "text-gray-400 group-hover:text-gray-500",
                                "mr-3 flex-shrink-0 h-6 w-6"
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                          </a>
                        ))}
                      </>
                    ) : (
                      <>
                        {menu.map((item) => (
                          <a
                            key={item.name}
                            href={`/${item.name}`}
                            className={classNames(
                              item.current
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                              "group rounded-md py-2 px-2 flex items-center text-sm font-medium"
                            )}
                          >
                            <DynamicHeroIcon
                              icon={item.topic_icon}
                              className={classNames(
                                item.current
                                  ? "text-gray-500"
                                  : "text-gray-400 group-hover:text-gray-500",
                                " mr-3  flex-shrink-0 h-6 w-6"
                              )}
                              aria-hidden="true"
                            />
                            <span className=" ml-3">
                              {item.name.charAt(0).toUpperCase() +
                                item.name.slice(1)}{" "}
                            </span>
                          </a>
                        ))}
                        {/* <a
                          key={"report"}
                          href={`/report`}
                          className={classNames(
                            // item.current
                            //   ? "bg-gray-100 text-gray-900"
                            //   : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                            "group rounded-md py-2 px-2 flex items-center text-sm font-medium"
                          )}
                        >
                          <Bars3BottomLeftIcon
                            className={classNames(
                              item.current
                                ? "text-gray-500"
                                : "text-gray-400 group-hover:text-gray-500",
                              " mr-3  flex-shrink-0 h-6 w-6"
                            )}
                            aria-hidden="true"
                          />
                          <span className=" ml-3">Report</span>
                        </a> */}
                      </>
                    )}
                  </nav>
                </div>
              </div>
            </div>

            <div className="md:pl-64 h-screen bg-gray-100">
              <div className="max-w-8xl mx-auto flex flex-col xl:px-0 bg-gray-100">
                <div className="sticky top-0 px-3 z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 flex">
                  <button
                    type="button"
                    className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                    onClick={() => setSidebarOpen(true)}
                  >
                    <span className="sr-only">Open sidebar</span>
                    <Bars3BottomLeftIcon
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  </button>
                  <Navbar />
                </div>
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
