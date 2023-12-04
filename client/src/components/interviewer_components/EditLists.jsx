import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { PlusIcon } from "@heroicons/react/24/solid";
import DynamicHeroIcon from "../DynamicSVG";
import { TrashIcon, PencilIcon, CheckIcon } from "@heroicons/react/24/outline";
import Delete_modal from "./Delete_modal";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const actions = [];

function EditList(props) {
  const navigate = useNavigate();
  const { topic } = useParams();
  const [resp, set_resp] = useState([]);
  const getList = () => {
    axios
      .get(`/topic-subtopic/get`)
      .then((res) => {
        console.log(res);
        set_resp(res.data.TopicsandSubtopics);
      })
      .catch((err) => console.log(err));
  };
  const details = JSON.parse(sessionStorage.getItem("userDetails"));
  useEffect(() => {
    if (details.user.role !== "Interviewer") {
      navigate("/unauthorized");
    }
    getList();
  }, []);
  const topics = resp.map((item) => {
    return {
      id: item.id,
      name: item.name,
      topic_icon: item.topic_icon,
      subtopics: item.subtopics,
    };
  });
  const [open, setOpen] = useState(false);
  const [show_input, set_show_input] = useState(false);
  const [del, set_del] = useState("");
  const handleDelete = (id) => {
    set_del(id);
    setOpen(!open);
  };
  const handleEdit = (id) => {
    console.log(input, id);
    axios
      .patch("topic-subtopic/topic-update", { topic: input, id })
      .then((res) => {
        console.log("Topic Updated", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [input, set_input] = useState("");
  const handleChange = (e) => {
    set_input(e.target.value);
    // console.log(e.target.value);
  };
  const [update_id, set_update_id] = useState("");
  const handleShow = (id) => {
    set_update_id(id);
    set_show_input(true);
  };
  return (
    <main className="flex-1 bg-gray-100">
      <h1 className=" mt-4 py-2 pl-2 text-xl font-medium text-white italic bg-indigo-500 ">
        {/* {topic.charAt(0).toUpperCase() + topic.slice(1)}{" "} */}
        Edit
      </h1>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 ">
            <div
              key={434242}
              className="relative rounded-lg border border-gray-300 bg-gray-200 px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 "
            >
              <PlusIcon className="h-6 w-6" aria-hidden="true" />
              <div className="flex-1 min-w-0">
                <a href={"/new"} className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">
                    Add new Topic
                  </p>
                  {/* <p className="text-sm text-gray-500 truncate">{itm.role}</p> */}
                </a>
              </div>
            </div>
            {topics.map((itm, index) => (
              <div
                key={itm.name}
                className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              >
                <DynamicHeroIcon
                  icon={itm.topic_icon}
                  className=" mr-3 text-gray-400  flex-shrink-0 h-6 w-6"
                  aria-hidden="true"
                />
                <div className="flex-1 min-w-0">
                  {itm.id === update_id ? (
                    <>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <div className="relative flex items-stretch flex-grow focus-within:z-10">
                          <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none"></div>
                          <input
                            type="text"
                            name="input"
                            value={input}
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-2 sm:text-sm border-gray-300"
                            placeholder={itm.name}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                        <button
                          type="button"
                          className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          <CheckIcon
                            onClick={() => {
                              handleEdit(itm.id);
                              set_show_input(false);
                            }}
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </>
                  ) : (
                    <a
                      href={`/edit-form/${itm.id}`}
                      className="focus:outline-none"
                    >
                      {/* <span className="absolute inset-0" aria-hidden="true" /> */}
                      <p className="text-sm font-medium text-gray-900">
                        {itm.name.charAt(0).toUpperCase() + itm.name.slice(1)}{" "}
                      </p>
                      {/* <p className="text-sm text-gray-500 truncate">{itm.role}</p> */}
                    </a>
                  )}
                </div>
                <TrashIcon
                  className=" h-6 w-6 hover:text-gray-600 text-gray-400"
                  onClick={(e) => handleDelete(itm.id)}
                />
                {/* <PencilIcon
                  className=" h-6 w-6 hover:text-gray-600 text-gray-400"
                  onClick={(e) => navigate(`/edit-form/${itm.id}`)}

                  onClick={(e) => {
                    handleShow(itm.id);
                  }}
                /> */}
              </div>
            ))}
          </div>
        </div>
      </div>
      {open && (
        <Delete_modal
          open={open}
          setOpen={setOpen}
          del={del}
          head={"topic"}
          getList={getList}
        />
      )}
    </main>
  );
}

export default EditList;
