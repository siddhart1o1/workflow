import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { TrashIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/solid";
import DynamicHeroIcon from "../DynamicSVG";
import Delete_modal from "./Delete_modal";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const actions = [];

function List_subtopic(props) {
  const navigate = useNavigate();
  const { topic } = useParams();
  const [resp, set_resp] = useState([]);
  const getList = () => {
    axios
      .get(`/topic-subtopic/get/${topic}`)
      .then((res) => {
        console.log(res);
        set_resp(res.data.subtopicsOfTargetTopic);
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
  const [open, setOpen] = useState(false);
  const [del, set_del] = useState("");
  const handleDelete = (id) => {
    set_del(id);
    setOpen(!open);
  };
  console.log(topic, resp);
  // const topics = resp.map((item) => {
  //   return {
  //     name: item.name,
  //     subtopics: item.subtopics,
  //   };
  // });
  // const selectedTopic = topics.find((topic) => `${topic.name}` === subtopic);
  // console.log(selectedTopic);
  // const subtopics = selectedTopic
  //   ? selectedTopic.subtopics.map((itm) => {
  //       return {
  //         name: itm,
  //       };
  //     })
  //   : [];
  // console.log(subtopic, subtopics);
  return (
    <main className="flex-1 bg-gray-100">
      <h1 className=" mt-4 py-2 pl-2 text-xl font-medium text-white italic bg-indigo-500 ">
        {/* {topic.charAt(0).toUpperCase() + topic.slice(1)}{" "} */}
        Add
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
                <a href={`/new/${topic}`} className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">
                    Add new Subtopic
                  </p>
                </a>
              </div>
            </div>
            {resp.map((itm) => (
              <div
                key={itm.name}
                className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              >
                <DynamicHeroIcon
                  icon={itm.subtopic_icon}
                  className={classNames(
                    itm.current
                      ? "text-gray-600"
                      : "text-gray-600 group-hover:text-gray-500",
                    " mr-3  flex-shrink-0 h-6 w-6"
                  )}
                  aria-hidden="true"
                />
                <div className="flex-1 min-w-0">
                  <a
                    href={`/add/${topic}/${itm.name}`}
                    className="focus:outline-none"
                  >
                    {/* <span className="absolute inset-0" aria-hidden="true" /> */}
                    <p className="text-sm font-medium text-gray-900">
                      {itm.name.charAt(0).toUpperCase() + itm.name.slice(1)}{" "}
                    </p>
                    {/* <p className="text-sm text-gray-500 truncate">{itm.role}</p> */}
                  </a>
                </div>
                {/* <TrashIcon
                  className=" h-6 w-6 hover:stroke-black text-gray-400"
                  onClick={(e) => handleDelete(itm.id)}
                /> */}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* {open && (
        <Delete_modal
          open={open}
          setOpen={setOpen}
          del={del}
          getList={getList}
          head={`${topic}`}
        />
      )} */}
    </main>
  );
}

export default List_subtopic;
