import axios from "axios";
import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import Unauthorized from "../Unauthorized";
import { CheckIcon, PlusIcon } from "@heroicons/react/24/outline";
import ComboBox from "./ComboBox";
import IconSelector from "./IconSelector";
import Icon_selector_modal from "./Icon_selector_modal";
import { useNavigate } from "react-router-dom";

export default function New_topic_subtopic() {
  const navigate = useNavigate();
  const [topic, set_topic] = useState("");
  const [subtopic, set_subtopic] = useState("");
  const [topic_icon, set_topic_icon] = useState("");
  const [subtopic_icon, set_subtopic_icon] = useState("");
  const [for_topic, set_for_topic] = useState(false);
  const [question, set_que] = useState("");
  const [open, setopen] = useState(false);
  const [options, set_options] = useState({
    opt1: "",
    opt2: "",
    opt3: "",
    opt4: "",
  });
  const [correct, set_correct] = useState("");

  const details = JSON.parse(sessionStorage.getItem("userDetails"));

  function handleoptions(e) {
    const { name, value } = e.target;
    set_options((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }
  function handleSubmit(e) {
    console.log(
      topic,
      subtopic,
      topic_icon,
      subtopic_icon,
      question,
      options,
      correct
    );
    axios
      .post(
        "/questions/new-topic",
        {
          topic,
          subtopic,
          topic_icon,
          subtopic_icon,
          question,
          options,
          correct,
        },
        {
          headers: {
            Authorization: "Bearer " + details.token,
          },
        }
      )
      .then((response) => {
        console.log(response);
        toast.success(response.data.message);
        setTimeout(() => {
          navigate(`/add/${topic}/${subtopic}`);
        }, 3000);
      })
      .catch((response) => {
        console.log(response);
      });
  }

  const selected_icon = (icon) => {
    for_topic ? set_topic_icon(icon) : set_subtopic_icon(icon);
  };
  // console.log(topic_icon, subtopic_icon);

  return (
    <>
      {details.user.role === "Interviewer" ? (
        <>
          <h1 className=" mt-4 py-2 pl-2 text-xl font-medium text-white italic bg-indigo-500 ">
            New
          </h1>
          <div className=" flex justify-center items-center h-fit">
            <div className=" my-10 w-3/4 max-w-5xl bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
              <Toaster />
              <div className="px-4 py-5 sm:p-6">
                <div className=" ">
                  <label
                    htmlFor="topic"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Topic
                  </label>

                  <div className="mt-1 flex gap-2">
                    <input
                      type="text"
                      name="topic"
                      id="topic"
                      value={topic}
                      onChange={(e) => set_topic(e.target.value)}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setopen(true);
                        set_for_topic(true);
                      }}
                      className="  px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {topic_icon ? (
                        <CheckIcon className=" w-4 h-4 text-white stroke-2" />
                      ) : (
                        <span>svg</span>
                      )}
                    </button>
                  </div>
                </div>
                {topic && (
                  <div className=" mt-3 ">
                    <label
                      htmlFor="topic"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Subtopic
                    </label>

                    <div className="mt-1 flex gap-2">
                      <input
                        type="text"
                        name="subtopic"
                        id="subtopic"
                        value={subtopic}
                        onChange={(e) => set_subtopic(e.target.value)}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setopen(true);
                          set_for_topic(false);
                        }}
                        className="  px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        {subtopic_icon ? (
                          <CheckIcon className=" w-4 h-4 text-white stroke-2" />
                        ) : (
                          <span>svg</span>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {subtopic && (
                  <div className=" mt-3">
                    <div>
                      <label
                        htmlFor="question"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Add your Question
                      </label>
                      <div className="mt-1">
                        <textarea
                          rows={2}
                          name="question"
                          value={question}
                          onChange={(e) => set_que(e.target.value)}
                          id="question"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div className=" mt-4">
                      <div className="flex justify-evenly gap-3">
                        <div className="mt-1">
                          <input
                            type="text"
                            name="opt1"
                            id="opt1"
                            value={options.opt1}
                            required
                            onChange={(e) => handleoptions(e)}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="Option1 "
                          />
                          <div className=" my-2 flex justify-center items-center">
                            <label className="mr-3 block text-sm font-medium text-gray-700">
                              a.
                            </label>
                            <input
                              id="correct1"
                              name="correct"
                              type="radio"
                              value="a"
                              onChange={(e) => set_correct(e.target.value)}
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                            />
                          </div>
                        </div>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="opt2"
                            id="opt2"
                            value={options.opt2}
                            required
                            onChange={(e) => handleoptions(e)}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="Option2 "
                          />
                          <div className=" my-2 flex justify-center items-center">
                            <label className="mr-3 block text-sm font-medium text-gray-700">
                              b.
                            </label>
                            <input
                              id="correct1"
                              name="correct"
                              type="radio"
                              value="b"
                              onChange={(e) => set_correct(e.target.value)}
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                            />
                          </div>
                        </div>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="opt3"
                            id="opt3"
                            value={options.opt3}
                            required
                            onChange={(e) => handleoptions(e)}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="Option3 "
                          />
                          <div className=" my-2 flex justify-center items-center">
                            <label className="mr-3 block text-sm font-medium text-gray-700">
                              c.
                            </label>
                            <input
                              id="correct1"
                              name="correct"
                              type="radio"
                              value="c"
                              onChange={(e) => set_correct(e.target.value)}
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                            />
                          </div>
                        </div>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="opt4"
                            id="opt4"
                            value={options.opt4}
                            required
                            onChange={(e) => handleoptions(e)}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="Option4 "
                          />
                          <div className=" my-2 flex justify-center items-center">
                            <label className="mr-3 block text-sm font-medium text-gray-700">
                              d.
                            </label>
                            <input
                              id="correct1"
                              name="correct"
                              type="radio"
                              value="d"
                              onChange={(e) => set_correct(e.target.value)}
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                            />
                          </div>
                        </div>
                      </div>
                      <p className=" text-center text-base font-medium text-gray-700">
                        Select correct option
                      </p>
                    </div>
                    <div className=" flex justify-center items-center mt-4">
                      <button
                        type="button"
                        onClick={(e) => handleSubmit(e)}
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {open && (
            <Icon_selector_modal
              open={open}
              setopen={setopen}
              // for_topic={for_topic}
              sendIcon={selected_icon}
            />
          )}
        </>
      ) : (
        <>
          <Unauthorized />
        </>
      )}
    </>
  );
}
