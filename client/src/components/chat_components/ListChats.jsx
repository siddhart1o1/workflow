import axios from "axios";
import React, { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";

function ListChats({ chat }) {
  const [users, set_users] = useState([]);
  const details = JSON.parse(sessionStorage.getItem("userDetails"));
  const get_users = () => {
    const friend = chat.members.find((itm) => itm !== details.user.id);
    axios
      .get(`/user/get/${friend}`)
      .then((res) => {
        set_users([res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    get_users();
  }, []);
  const handleDelete = (chat_id) => {
    axios
      .post(
        "/chat/delete",
        { chat_id },
        {
          headers: {
            Authorization: "Bearer " + details.token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className=" text-white">
      {users.map((itm, index) => (
        <p
          key={index}
          className=" bg-indigo-500 my-1 p-1 rounded-md cursor-pointer flex justify-between overflow-auto"
        >
          {itm.email}
          {details.user.role === "Interviewer" ? (
            <TrashIcon
              className="h-3 w-3 hover:text-gray-200 text-gray-100 hover:cursor-pointer mt-2"
              onClick={(e) => handleDelete(chat._id)}
            />
          ) : (
            <></>
          )}
        </p>
      ))}
    </div>
  );
}

export default ListChats;
