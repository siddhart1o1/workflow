import { Fragment, useEffect, useState } from "react";
import { Dialog, Switch, Transition } from "@headlessui/react";
import {
  BellIcon,
  BriefcaseIcon,
  ChatBubbleBottomCenterIcon,
  CogIcon,
  DocumentMagnifyingGlassIcon,
  HomeIcon,
  Bars3BottomRightIcon,
  QuestionMarkCircleIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Heatmap from "./Heatmap";

const tabs = [{ name: "General", href: "#", current: true }];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Profile() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const details = JSON.parse(sessionStorage.getItem("userDetails"));
  if (!details) {
    navigate("/login");
  }
  const [email, setemail] = useState("");
  const [role, setrole] = useState("");
  useEffect(() => {
    axios
      .get("/user/get", {
        headers: {
          Authorization: "Bearer " + details.token,
        },
      })
      .then((res) => {
        setemail(res.data.email);
        setrole(res.data.role);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {/*
        This example requires updating your template:
        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div className=" h-full bg-gray-100">
        <div className=" h-full">
          <div>
            <div className="">
              <h1 className=" mt-4 py-2 pl-2 text-xl font-medium text-white italic bg-indigo-500 ">
                Profile
              </h1>
              <div className="max-w-4xl mx-auto flex flex-col md:px-8 xl:px-0 my-4 ">
                <main className="flex-1 bg-white">
                  <div className="relative max-w-4xl mx-auto md:px-8">
                    <div className="">
                      <div className="">
                        <div className="py-6 px-4 md:px-0">
                          {/* Tabs */}
                          <div className="lg:hidden">
                            <label htmlFor="selected-tab" className="sr-only">
                              Select a tab
                            </label>
                            <select
                              id="selected-tab"
                              name="selected-tab"
                              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                              defaultValue={
                                tabs.find((tab) => tab.current).name
                              }
                            >
                              {tabs.map((tab) => (
                                <option key={tab.name}>{tab.name}</option>
                              ))}
                            </select>
                          </div>
                          <div className="hidden lg:block">
                            <div className="border-b border-gray-200">
                              <nav className="-mb-px flex space-x-8">
                                {tabs.map((tab) => (
                                  <a
                                    key={tab.name}
                                    href={tab.href}
                                    className={classNames(
                                      tab.current
                                        ? "border-indigo-500 text-indigo-600"
                                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                                      "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                                    )}
                                  >
                                    {tab.name}
                                  </a>
                                ))}
                              </nav>
                            </div>
                          </div>

                          {/* Description list with inline editing */}
                          <div className="mt-6 divide-y divide-gray-200">
                            <div className="mt-6">
                              <dl className="divide-y divide-gray-200">
                                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                                  <dt className="text-sm font-medium text-gray-500">
                                    Email
                                  </dt>
                                  <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <span className="flex-grow">{email}</span>
                                  </dd>
                                </div>
                                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                                  <dt className="text-sm font-medium text-gray-500">
                                    Role
                                  </dt>
                                  <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <span className="flex-grow">{role}</span>
                                  </dd>
                                </div>
                                {/* <Heatmap /> */}
                              </dl>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </main>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
