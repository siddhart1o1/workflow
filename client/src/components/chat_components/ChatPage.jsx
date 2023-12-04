import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ListChats from "./ListChats";
import Messaging_Window from "./Messaging_Window";
import { io } from "socket.io-client";
import { Toaster } from "react-hot-toast";

function Chat() {
  const details = JSON.parse(sessionStorage.getItem("userDetails"));
  const [chats, set_chats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMssg, setNewmssg] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const scrollref = useRef();

  useEffect(() => {
    socket.current = io(`${import.meta.env.VITE_SOCKET_BACKEND}`, {
      transports: ["websocket"],
    });
    // socket.current = io("ws://localhost:9001");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        content: data.content,
      });
    });
    // socket.current.emit("addUser", details.user.id);
  }, [details]);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", details.user.id);
    socket.current.on("getUsers", (users) => {
      // setOnlineUsers(
      //   details.followings.filter((f) => users.some((u) => u.userId === f))
      // );
    });
  }, [details]);

  useEffect(() => {
    axios
      .get("/chat/get", {
        headers: {
          Authorization: "Bearer " + details.token,
        },
      })
      .then((res) => {
        set_chats(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    axios
      .get("/mssg/get/" + currentChat?._id)
      .then((res) => {
        setMessages(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentChat]);

  useEffect(() => {
    scrollref.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = {
      sender: details.user.id,
      content: newMssg,
      conversationId: currentChat._id,
    };
    const receiverId = currentChat.members.find(
      (member) => member !== details.user.id
    );
    socket.current.emit("sendMessage", {
      senderId: details.user.id,
      receiverId,
      content: newMssg,
    });
    axios
      .post("/mssg/add", message)
      .then((res) => {
        console.log(res.data);
        setMessages([...messages, res.data]);
        setNewmssg("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="h-full bg-gray-100">
      <div className="h-full">
        <Toaster />
        <div>
          <div className="">
            <h1 className="mt-4 py-2 pl-2 text-xl font-medium text-white italic bg-indigo-500">
              Chat
            </h1>
            <div className="max-w-4xl mx-auto flex flex-col md:px-8 xl:px-0 my-4">
              <div className="space-y-6">
                <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
                  <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Recent Chats
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Only Admin can initiate conversation with other
                        non-admin users and not vice-versa
                      </p>
                      <div className="">
                        {chats.map((chat) => (
                          <div onClick={() => setCurrentChat(chat)}>
                            <ListChats chat={chat} />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-5 md:mt-0 md:col-span-2">
                      {currentChat ? (
                        <>
                          <div className="h-[400px] flex flex-col bg-gray-200 rounded-lg overflow-hidden">
                            <div className="flex-grow overflow-y-auto p-4">
                              {messages.map((itm) => (
                                <div ref={scrollref}>
                                  <Messaging_Window
                                    mssg={itm}
                                    id={itm._id}
                                    time={itm.time}
                                    own={itm.sender === details.user.id}
                                  />
                                </div>
                              ))}
                            </div>
                            <div className="flex justify-end bottom-0 bg-gray-200 p-3 rounded-lg border-t-2 border-gray-300">
                              <div className="mt-1 w-full">
                                <input
                                  type="text"
                                  name="newMssg"
                                  value={newMssg}
                                  onChange={(e) => setNewmssg(e.target.value)}
                                  id="newMssg"
                                  autoComplete="off"
                                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>
                              <button
                                onClick={(e) => handleSubmit(e)}
                                className="ml-3 justify-center py-1 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                Send
                              </button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="h-[400px] flex flex-col bg-gray-200 rounded-lg overflow-hidden">
                            <div className="flex-grow overflow-y-auto p-4">
                              <p className=" text-gray-800 font-serif text-center">
                                Select a conversation to get started
                              </p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;

{
  /* <div className="grid grid-cols-3 gap-6">
                          <div className="col-span-4 sm:col-span-3">
                            <label
                              htmlFor="title"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Title
                            </label>
                            <input
                              type="text"
                              name="title"
                              id="title"
                              value={form.title}
                              onChange={(e) => handleChange(e)}
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="content"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Content
                          </label>
                          <div className="mt-1">
                            <textarea
                              id="content"
                              name="content"
                              value={form.content}
                              onChange={(e) => handleChange(e)}
                              rows={3}
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                            />
                          </div>
                          <p className="mt-2 text-sm text-gray-500">
                            Brief description for your experiences or opinion.
                          </p>
                        </div>
                        <fieldset>
                          <div>
                            <legend className="text-base font-medium text-gray-900">
                              Category
                            </legend>
                            <p className="text-sm text-gray-500">
                              Please select a category for your blog
                            </p>
                          </div>
                          <div className="mt-4 space-y-4">
                            <div className="flex items-center">
                              <input
                                id="discussion"
                                name="category"
                                type="radio"
                                value={"discussion"}
                                checked={option === "discussion"}
                                onChange={(e) => handleOptionChange(e)}
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                              />
                              <label
                                htmlFor="discussion"
                                className="ml-3 block text-sm font-medium text-gray-700"
                              >
                                Discussion
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                id="experiences"
                                name="category"
                                type="radio"
                                value={"experiences"}
                                checked={option === "experiences"}
                                onChange={(e) => handleOptionChange(e)}
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                              />
                              <label
                                htmlFor="experiences"
                                className="ml-3 block text-sm font-medium text-gray-700"
                              >
                                Experiences
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                id="opinion"
                                name="category"
                                type="radio"
                                value={"opinion"}
                                checked={option === "opinion"}
                                onChange={(e) => handleOptionChange(e)}
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                              />
                              <label
                                htmlFor="opinion"
                                className="ml-3 block text-sm font-medium text-gray-700"
                              >
                                Opinion
                              </label>
                            </div>
                          </div>
                        </fieldset> */
}
