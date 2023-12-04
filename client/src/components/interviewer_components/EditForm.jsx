import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DynamicHeroIcon from "../DynamicSVG";
import Icon_selector_modal from "./Icon_selector_modal";
import { TrashIcon } from "@heroicons/react/24/outline";
const EditForm = () => {
  const details = JSON.parse(sessionStorage.getItem("userDetails"));
  useEffect(() => {
    if (details.user.role !== "Interviewer") {
      navigate("/unauthorized");
    }
  }, []);
  const [open, setopen] = useState(false);
  const [data, setData] = useState({});
  const [list, setList] = useState([]);
  const [topic_icon, set_topic_icon] = useState("");
  const [updatedList, setUpdatedList] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    getAll();
  }, []);

  const handleTopicChange = (e) => {
    setData({
      ...data,
      topic: e.target.value,
    });
  };
  const getAll = () => {
    axios
      .get(`/topic-subtopic/list-all-subtopic-questions/${id}`)
      .then((response) => {
        console.log(response.data);
        const { topic, topic_icon, subtopicsWithQuestions } = response.data;
        setData({ topic, subtopicsWithQuestions });
        set_topic_icon(topic_icon);
        setList(subtopicsWithQuestions);
        setUpdatedList([...subtopicsWithQuestions]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleSubtopicChange = (e, index) => {
    const updatedSubtopics = [...updatedList];
    updatedSubtopics[index].name = e.target.value;
    setUpdatedList(updatedSubtopics);
  };

  const handleQuestionChange = (e, subtopicIndex, questionIndex) => {
    const updatedSubtopics = [...updatedList];
    updatedSubtopics[subtopicIndex].questions[questionIndex].questionText =
      e.target.value;
    setUpdatedList(updatedSubtopics);
  };

  const handleOptionChange = (e, subtopicIndex, questionIndex, optionIndex) => {
    const updatedSubtopics = [...updatedList];
    updatedSubtopics[subtopicIndex].questions[questionIndex].options[
      optionIndex
    ] = e.target.value;
    setUpdatedList(updatedSubtopics);
  };

  const handleCorrectOptionChange = (e, subtopicIndex, questionIndex) => {
    const updatedSubtopics = [...updatedList];
    const selectedIndex = parseInt(e.target.value);
    updatedSubtopics[subtopicIndex].correctOptionIndices[questionIndex] =
      selectedIndex;
    setUpdatedList(updatedSubtopics);
  };

  const handleSubmit = () => {
    // Send the updated data (updatedList) to your API endpoint
    console.log(data.topic, updatedList);
    axios
      .put(`/topic-subtopic/update-whole/${id}`, {
        topic: data.topic,
        topic_icon: topic_icon,
        subtopicsWithQuestions: updatedList,
      })
      .then((response) => {
        console.log("Data updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };
  const setIcon = (icon) => {
    set_topic_icon(icon);
  };
  const DeleteQuestion = (questionIndex, index, subtopicIndex) => {
    console.log(questionIndex, index, subtopicIndex);
    axios
      .post(`/topic-subtopic/delete-question/${id}`, {
        subtopicIndex,
        index,
        questionIndex,
      })
      .then((res) => {
        console.log(res);
        getAll();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <main className="flex-1 bg-gray-100">
        <h1 className=" mt-4 py-2 pl-2 text-xl font-medium text-white italic bg-indigo-500 ">
          {/* {topic.charAt(0).toUpperCase() + topic.slice(1)}{" "} */}
          Edit
        </h1>
        <div className="flex justify-center items-center h-fit">
          <div className="my-10 w-3/4 max-w-5xl bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
            {/* Your other components */}
            <div className="px-4 py-5 sm:p-6">
              <div className="">
                <label
                  htmlFor="topic"
                  className="block text-sm font-medium text-gray-700"
                >
                  Topic
                </label>
                <div className="mt-1 flex gap-2">
                  <input
                    type="text"
                    name="name"
                    id="topic"
                    value={data.topic}
                    onChange={handleTopicChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setopen(true);
                    }}
                    className="px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {/* Your topic icon */}
                    {topic_icon ? (
                      <DynamicHeroIcon
                        icon={topic_icon}
                        className="  mr-3 text-gray-400  flex-shrink-0 h-6 w-6"
                        aria-hidden="true"
                      />
                    ) : (
                      <span>svg</span>
                    )}
                  </button>
                </div>
              </div>
              {/* Subtopics and Questions */}
              {list.map((itm, subtopicIndex) => (
                <div key={subtopicIndex}>
                  <label
                    htmlFor={`subtopic_${subtopicIndex}`}
                    className="block text-sm font-medium text-gray-700 my-2"
                  >
                    {subtopicIndex + 1}. Subtopic
                  </label>
                  <div className="mt-1 flex gap-2">
                    <input
                      type="text"
                      name={`subtopic_${subtopicIndex}`}
                      id={`subtopic_${subtopicIndex}`}
                      value={updatedList[subtopicIndex].name}
                      onChange={(e) => handleSubtopicChange(e, subtopicIndex)}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setopen(true);
                      }}
                      className="px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {/* Your subtopic icon */}
                      <DynamicHeroIcon
                        icon={itm.subtopic_icon}
                        className="  mr-3 text-gray-400  flex-shrink-0 h-6 w-6"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                  {itm.questions.map((item, questionIndex) => (
                    <div key={questionIndex}>
                      <label
                        htmlFor={`question_${subtopicIndex}_${questionIndex}`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        Question
                      </label>
                      <div>
                        <div className="mt-1 flex gap-3">
                          <textarea
                            rows={2}
                            name={`question_${subtopicIndex}_${questionIndex}`}
                            value={item.questionText}
                            onChange={(e) =>
                              handleQuestionChange(
                                e,
                                subtopicIndex,
                                questionIndex
                              )
                            }
                            id={`question_${subtopicIndex}_${questionIndex}`}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={() =>
                              DeleteQuestion(item._id, questionIndex, itm._id)
                            }
                          >
                            <TrashIcon
                              className=" mt-4 text-gray-500  flex-shrink-0 h-6 w-6 hover:cursor-pointer hover:text-red-500"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex justify-evenly gap-3">
                          {item.options.map((opt, optionIndex) => (
                            <div key={optionIndex} className="mt-1">
                              <input
                                type="text"
                                name={`opt_${subtopicIndex}_${questionIndex}_${optionIndex}`}
                                id={`opt_${subtopicIndex}_${questionIndex}_${optionIndex}`}
                                value={opt}
                                required
                                onChange={(e) =>
                                  handleOptionChange(
                                    e,
                                    subtopicIndex,
                                    questionIndex,
                                    optionIndex
                                  )
                                }
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                placeholder={`Option ${optionIndex + 1}`}
                              />
                              <div className="my-2 flex justify-center items-center">
                                <input
                                  id={`correct_${subtopicIndex}_${questionIndex}_${optionIndex}`}
                                  type="radio"
                                  checked={
                                    optionIndex ===
                                    itm.correctOptionIndices[questionIndex]
                                  }
                                  value={optionIndex}
                                  onChange={(e) =>
                                    handleCorrectOptionChange(
                                      e,
                                      subtopicIndex,
                                      questionIndex
                                    )
                                  }
                                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                  <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                </div>
              ))}
              {/* Submit Button */}
              <div className="flex justify-center items-center mt-4">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      {open && (
        <Icon_selector_modal open={open} setopen={setopen} sendIcon={setIcon} />
      )}
    </>
  );
};

export default EditForm;
