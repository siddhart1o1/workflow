import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/solid";
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  EnvelopeOpenIcon,
  AdjustmentsVerticalIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import Unauthorized from "../Unauthorized";
import SEO from "../../SEO";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Report() {
  const navigate = useNavigate();
  const details = JSON.parse(sessionStorage.getItem("userDetails"));
  const [data, set_data] = useState([]);
  const [max, setmax] = useState(0);
  const [min, setmin] = useState(0);
  const [count, setcount] = useState(0);
  const [avg, setavg] = useState(0);
  const stats = [
    {
      id: 1,
      name: "Total test taken",
      stat: count,
      icon: EnvelopeOpenIcon,
      change: "",
    },
    {
      id: 2,
      name: "Avg. Score",
      stat: `${avg}%`,
      icon: AdjustmentsVerticalIcon,
      change: "",
    },
    {
      id: 3,
      name: "Max Score",
      stat: `${max}%`,
      icon: ArrowTrendingUpIcon,
      change: "",
    },
    {
      id: 3,
      name: "Min Score",
      stat: `${min}%`,
      icon: ArrowTrendingDownIcon,
      change: "",
    },
  ];
  useEffect(() => {
    axios
      .get("/user/report", {
        headers: {
          Authorization: "Bearer " + details.token,
        },
      })
      .then((response) => {
        set_data(response.data.all_entry);
        setmax(response.data.max);
        setmin(response.data.min);
        setcount(response.data.count);
        setavg(response.data.avg);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <SEO
        title="Your practice report"
        description="Access overall report of your test "
        name="workflow"
        type="article"
      />
      {details.user.role === "User" ? (
        <main className=" h-full bg-gray-100">
          <Toaster />
          <h1 className=" mt-4 py-2 pl-2 text-xl font-medium text-white italic bg-indigo-500 ">
            Report
          </h1>
          <div className=" mt-1 pb-6 px-4 sm:px-6 lg:px-8">
            <div className=" mt-6 mb-6 sm:px-0 md:px-0">
              <div>
                <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {stats.map((item) => (
                    <div
                      key={item.id}
                      className="relative bg-white pt-5 px-4 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
                    >
                      <dt>
                        <div
                          className={classNames(
                            item.name === "Max Score"
                              ? "bg-green-600"
                              : item.name === "Min Score"
                              ? "bg-red-600"
                              : "bg-indigo-500",
                            "absolute rounded-md p-3"
                          )}
                        >
                          <item.icon
                            className="h-6 w-6 text-white"
                            aria-hidden="true"
                          />
                        </div>
                        <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                          {item.name}
                        </p>
                      </dt>
                      <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                        <p className="text-2xl font-semibold text-gray-900">
                          {item.stat}
                        </p>
                        <p
                          className={classNames(
                            item.changeType === "increase"
                              ? "text-green-600"
                              : "text-red-600",
                            "ml-2 flex items-baseline text-sm font-semibold"
                          )}
                        >
                          {/* {item.changeType === "increase" ? (
                      <ArrowUpIcon
                        className="self-center flex-shrink-0 h-5 w-5 text-green-500"
                        aria-hidden="true"
                      />
                    ) : (
                      <ArrowDownIcon
                        className="self-center flex-shrink-0 h-5 w-5 text-red-500"
                        aria-hidden="true"
                      />
                    )} */}

                          <span className="sr-only">
                            {item.changeType === "increase"
                              ? "Increased"
                              : "Decreased"}{" "}
                            by
                          </span>
                          {item.change}
                        </p>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <div className="mt-8 flex flex-col">
              <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                          >
                            Topic
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Subtopic
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Score
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {data.map((itm, personIdx) => (
                          <tr
                            key={itm._id}
                            className={
                              personIdx % 2 === 0 ? undefined : "bg-gray-50"
                            }
                          >
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              {itm.topic.charAt(0).toUpperCase() +
                                itm.topic.slice(1)}
                            </td>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              {itm.subtopic.charAt(0).toUpperCase() +
                                itm.subtopic.slice(1)}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {itm.score}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {new Date(itm.date).toLocaleDateString("en-GB")}
                            </td>
                            {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {itm.role}
                      </td> */}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="mt-2 mb-10 px-4 py-2 bg-white"> */}
            <div className=" relative max-w-8xl mx-auto xl:px-0 bg-white mt-4">
              <div className="sm:px-2 px-4 ">
                <div className=" sm:px-2 md:px-3 lg:px-4"></div>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <Unauthorized />
      )}
    </>
  );
}

{
  /* <div className="py-2">
    <div className="mt-5 divide-y divide-gray-200">
      <div className="mt-3">
        <dl className="divide-y divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">
              Name
            </dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow  text-gray-700">
                {admin ? admin.username : "Loading..."}
              </span>
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
            <dt className="text-sm font-medium text-gray-500">
              Email
            </dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow text-gray-700">
                {admin ? admin.email : "Loading..."}
              </span>
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
            <dt className="text-sm font-medium text-gray-500">
              Photo
            </dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow text-gray-700">
                {admin && admin.image ? (
                  <img
                    className="h-16 w-16 rounded-full"
                    src={admin.image}
                    alt=""
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </span>
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200">
            <dt className="text-sm font-medium text-gray-500">
              Role
            </dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow text-gray-700">
                {admin ? admin.role : "Loading..."}
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div> */
}
