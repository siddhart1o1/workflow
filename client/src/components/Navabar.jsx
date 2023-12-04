import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  ChatBubbleOvalLeftIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
const userNavigation = [
  { name: "Your Profile", href: "/profile" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const navigate = useNavigate();
  const [admin_pic, set_pic] = useState("");
  const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
  if (!userDetails) {
    navigate("/login");
  }
  // useEffect(() => {
  //   if (userDetails !== null) {
  //     axios
  //       .get(
  //         `https://testing-node.ibrcloud.com/api/admin/getadmin?id=${userDetails.user._id}`
  //       )
  //       .then((response) => {
  //         set_pic(response.data.image);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }, []);

  function handleSignout() {
    sessionStorage.clear();
    navigate("/login");
  }
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex-1 flex justify-between z-50 px-4 md:px-0">
      <div className="flex-1 flex"></div>
      <div className="ml-4 flex items-center md:ml-6 gap-4">
        <Link
          to={"/chat"}
          className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <span className="sr-only">View notifications</span>
          <ChatBubbleOvalLeftIcon
            className="h-6 w-6 stroke-gray-500"
            aria-hidden="true"
          />
        </Link>
        <Link
          to={"/room"}
          className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <span className="sr-only">Start Meeting</span>
          <VideoCameraIcon
            className="h-6 w-6 stroke-gray-500 stroke-1.5"
            aria-hidden="true"
          />
        </Link>
        {/* Profile dropdown */}
        <Menu as="div" className="ml-3 relative">
          <div>
            <Menu.Button className="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="sr-only">Open user menu</span>
              {admin_pic ? (
                <img className="h-8 w-8 rounded-full" src={admin_pic} alt="" />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="gray"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              )}
              {/* <img
                className="h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              /> */}
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
            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none">
              {userNavigation.map((item) => (
                <Menu.Item key={item.name}>
                  {({ active }) => (
                    <a
                      href={item.name === "Sign out" ? "" : item.href}
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block py-2 px-4 text-sm text-gray-700"
                      )}
                      onClick={
                        item.name === "Sign out" ? handleSignout : undefined
                      }
                    >
                      {item.name}
                    </a>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}
