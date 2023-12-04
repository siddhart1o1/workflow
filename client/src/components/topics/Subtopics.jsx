import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "./Modal";
import { Toaster, toast } from "react-hot-toast";
import SEO from "../../SEO";

export default function Subtopics(props) {
  const subtopic = useParams();
  const [score, set_score] = useState(0);
  const [open, setOpen] = useState(false);
  const [questions, set_questions] = useState([]);
  const [correct_ans, set_correct_ans] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  useEffect(() => {
    axios
      .get(`/questions/${subtopic.topic}/${subtopic.subtopic}`)
      .then((response) => {
        console.log(response);
        set_questions(response.data[0].questions);
      })
      .catch((response) => {
        console.log(response);
      });
  }, []);

  const handleChange = (questionIndex, index) => {
    setSelectedOptions((prevSelectedOptions) => {
      const newSelectedOptions = [...prevSelectedOptions];
      newSelectedOptions[questionIndex] = index;
      return newSelectedOptions;
    });
  };
  const details = JSON.parse(sessionStorage.getItem("userDetails"));
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(selectedOptions);
    axios
      .post(
        `/questions/match/${subtopic.topic}/${subtopic.subtopic}`,
        {
          selectedOptions,
        },
        {
          headers: {
            Authorization: "Bearer " + details.token,
          },
        }
      )
      .then((response) => {
        console.log(response);
        set_score(response.data.final_score);
        set_correct_ans(response.data.correct);
        setOpen(true);
      })
      .catch((response) => {
        toast.error(response.response.data.msg);
        console.log(response.response.data.msg);
      });
  };
  console.log(subtopic.subtopic);
  return (
    <>
      <SEO
        title={`Practice ${subtopic.subtopic}.`}
        description="Practice number of questions to master the topic and get a comprehensive report at the end."
        name="workflow"
        type="article"
      />
      <main className="flex-1 mb-4 bg-gray-100">
        <h1 className=" mt-4 py-2 pl-2 text-xl font-medium text-white italic bg-indigo-500 ">
          {subtopic.topic.charAt(0).toUpperCase() + subtopic.topic.slice(1)}{" "}
          /&nbsp;
          {subtopic.subtopic.charAt(0).toUpperCase() +
            subtopic.subtopic.slice(1)}
        </h1>
        <Toaster />
        <div className="py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            {questions.map((itm, questionIndex) => (
              <div id={questionIndex} className=" bg-white p-3 my-3">
                <label className="md:text-base sm:text-sm font-medium text-gray-800">
                  {questionIndex + 1}. {itm.questionText}
                </label>
                <fieldset className="mt-4">
                  <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                    <div key={itm._id} className="flex items-center">
                      {itm.options.map((option, index) => (
                        <div key={option} className="flex items-center mx-4">
                          <input
                            id={`question_${questionIndex}_option_${index}`}
                            name={`question_${questionIndex}`}
                            type="radio"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                            onChange={() => handleChange(questionIndex, index)}
                            checked={selectedOptions[questionIndex] === index}
                          />
                          <label
                            htmlFor={option}
                            className="ml-1 block md:text-base font-normal text-gray-800 sm:text-sm"
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </fieldset>
              </div>
            ))}
          </div>
        </div>
        <div className=" flex justify-center items-center">
          <button
            type="button"
            onClick={(e) => handleSubmit(e)}
            className="inline-flex mx-auto items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
        {open && <Modal open={open} setOpen={setOpen} score={score} />}
      </main>
    </>
  );
}
