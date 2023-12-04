import { TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";

function Messaging_Window({ mssg, own, id, time }) {
  const convert_time = (time) => {
    const isoDate = time;
    const utcDate = new Date(isoDate);
    const localDate = new Date(
      utcDate.toLocaleString("en-US", { timeZone: "IST" })
    );

    const dd = String(localDate.getDate()).padStart(2, "0");
    const mm = String(localDate.getMonth() + 1).padStart(2, "0");
    const yy = String(localDate.getFullYear()).slice(-2);
    const hh = String(localDate.getHours()).padStart(2, "0");
    const min = String(localDate.getMinutes()).padStart(2, "0");

    const formattedDate = `${dd}-${mm}-${yy} ${hh}:${min}`;
    return formattedDate;
  };
  const handleDelete = (mssg_id) => {
    axios
      .post("/mssg/delete", { mssg_id })
      .then((res) => {
        toast.success("Message deleted, reload to see changes");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div
        className={`flex flex-col my-3 ${own ? "items-end" : "items-start"}`}
      >
        <p
          className={`bg-indigo-500 text-white text-lg px-2 py-1 rounded-lg max-w-[350px] flex ${
            own ? "justify-end" : "justify-start"
          }`}
        >
          {mssg.content}
          {own ? (
            <TrashIcon
              className="h-3 w-3 hover:text-gray-200 text-gray-100 hover:cursor-pointer ml-2 mt-3"
              onClick={(e) => handleDelete(id)}
            />
          ) : (
            <></>
          )}
        </p>
        <span className="text-xs text-gray-400">{convert_time(time)}</span>
      </div>
    </>
  );
}

export default Messaging_Window;
