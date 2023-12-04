/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Menu, Transition } from "@headlessui/react";
import {
  CheckIcon,
  EllipsisVerticalIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import Calendar from "rc-calendar";
import "rc-calendar/assets/index.css"; // Import the CSS for styling (optional)
import moment from "moment";
import Calendar_Modal from "./Calendar_form";
import axios from "axios";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function MyCalendar() {
  const [open, setOpen] = useState(false);
  const details = JSON.parse(sessionStorage.getItem("userDetails"));
  const [events, setevents] = useState([]);
  const get_events = async () => {
    await axios
      .get("/event/get", {
        headers: {
          Authorization: "Bearer " + details.token,
        },
      })
      .then((res) => {
        setevents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    get_events();
  }, []);
  const handleComplete = (id) => {
    console.log(id);
    axios
      .patch("/event/edit", { id })
      .then((res) => {
        get_events();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDelete = (id) => {
    console.log(id);
    axios
      .post("/event/delete", { id })
      .then((res) => {
        get_events();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className=" h-full bg-gray-100">
        <div className=" h-full">
          <div>
            <div className="">
              <h1 className=" mt-4 py-2 pl-2 text-xl font-medium text-white italic bg-indigo-500 ">
                Calendar
              </h1>
              <div className="max-w-4xl mx-auto flex flex-col md:px-8 xl:px-0 my-4 ">
                <main className="flex-1 bg-white rounded-lg">
                  <div className="relative max-w-4xl justify-evenly gap-3 flex p-5">
                    <div>
                      <Calendar />
                    </div>
                    <section className="mt-12 md:mt-0 md:pl-14">
                      <div className=" flex gap-4">
                        <h2 className="font-semibold text-gray-900">
                          Scheduled Events
                        </h2>
                        <button
                          type="button"
                          onClick={() => setOpen(true)}
                          className="inline-flex items-center border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <PlusIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                      <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
                        {events.map((meeting) => (
                          <li
                            key={meeting.id}
                            className={`group flex items-center space-x-4 rounded-xl py-2 px-4 focus-within:bg-gray-100 ${
                              meeting.status ? ` bg-green-300` : `bg-red-300`
                            } `}
                          >
                            <div className="flex-auto">
                              <p className="text-gray-900 flex">
                                {meeting.title}{" "}
                                {meeting.status ? (
                                  <CheckIcon className="h-3 w-3 stroke-[3px] bg-green-400 rounded-full m-1 text-white " />
                                ) : (
                                  <></>
                                )}
                              </p>
                              <p className="mt-0.5 text-gray-500">
                                <time dateTime={meeting.startDatetime}>
                                  {meeting.date}
                                </time>{" "}
                                /{" "}
                                <time dateTime={meeting.time}>
                                  {meeting.time}
                                </time>
                              </p>
                            </div>
                            <Menu
                              as="div"
                              className="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100"
                            >
                              <div>
                                <Menu.Button className="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600">
                                  <span className="sr-only">Open options</span>
                                  <EllipsisVerticalIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                  />
                                </Menu.Button>
                              </div>

                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                              >
                                <Menu.Items className="focus:outline-none absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                                  <div className="py-1">
                                    <Menu.Item>
                                      {({ active }) => (
                                        <button
                                          onClick={(e) =>
                                            handleComplete(meeting._id)
                                          }
                                          className={classNames(
                                            active
                                              ? "bg-gray-100 text-gray-900"
                                              : "text-gray-700",
                                            "block px-4 py-2 text-sm"
                                          )}
                                        >
                                          Completed
                                        </button>
                                      )}
                                    </Menu.Item>
                                    <Menu.Item>
                                      {({ active }) => (
                                        <button
                                          onClick={(e) =>
                                            handleDelete(meeting._id)
                                          }
                                          className={classNames(
                                            active
                                              ? "bg-gray-100 text-gray-900"
                                              : "text-gray-700",
                                            "block px-4 py-2 text-sm"
                                          )}
                                        >
                                          Delete
                                        </button>
                                      )}
                                    </Menu.Item>
                                  </div>
                                </Menu.Items>
                              </Transition>
                            </Menu>
                          </li>
                        ))}
                      </ol>
                    </section>
                  </div>
                </main>
              </div>
            </div>
          </div>
        </div>
      </div>
      {open && (
        <Calendar_Modal open={open} setOpen={setOpen} get_events={get_events} />
      )}
    </>
  );
}
