import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  EnvelopeOpenIcon,
  AdjustmentsVerticalIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import Unauthorized from "../Unauthorized";
import SEO from "../../SEO";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Scoreboard(props) {
  const navigate = useNavigate();
  const details = JSON.parse(sessionStorage.getItem("userDetails"));
  useEffect(() => {
    if (details.user.role !== "Interviewer") {
      navigate("/unauthorized");
    }
  }, []);
  const [data, set_data] = useState([]);
  useEffect(() => {
    axios
      .get("/interviewer/scoreboard", {
        headers: {
          Authorization: "Bearer " + details.token,
        },
      })
      .then((response) => {
        console.log(response);
        set_data(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  let i = 0;

  const AddChat = (userId) => {
    console.log(userId);
    axios
      .post("/chat/add", {
        senderId: details.user.id,
        receiverId: userId,
      })
      .then((res) => {
        console.log(res);
        navigate("/chat");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <SEO
        title="Participants Scoreboard"
        description="Watch over particants score to get the best talent"
        name="workflow"
        type="article"
      />
      {details.user.role === "Interviewer" ? (
        <>
          <main className=" h-full bg-gray-100">
            <h1 className=" mt-4 py-2 pl-2 text-xl font-medium text-white italic bg-indigo-500 ">
              Scoreboard
            </h1>
            <div className=" mt-1 pb-6 px-4 sm:px-6 lg:px-8">
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
                              Rank
                            </th>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                            >
                              Email
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Tests Taken
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Average Score
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Max Score
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Min Score
                            </th>
                            <th
                              scope="col"
                              className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                            >
                              <span className="sr-only">Chat</span>
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
                                {personIdx + 1}.
                              </td>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                {itm.userEmail}
                              </td>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                {itm.testCount}
                              </td>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                {itm.avgScore.toFixed(2)}%
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {itm.maxScore}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {itm.minScore}
                              </td>
                              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                <button
                                  onClick={() => AddChat(itm.userId)}
                                  className=" text-indigo-600 hover:text-indigo-700"
                                >
                                  <ChatBubbleLeftRightIcon className=" h-6 w-6 hover:fill-current" />
                                  <span className="sr-only"></span>
                                </button>
                              </td>
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
        </>
      ) : (
        <>
          <Unauthorized />
        </>
      )}
    </>
  );
}

export default Scoreboard;
