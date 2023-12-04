import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../Context";

const LobbyScreen = () => {
  const navigate = useNavigate();
  const details = JSON.parse(sessionStorage.getItem("userDetails"));
  const [email, setEmail] = useState(details.user.email);
  const [room, setRoom] = useState("");
  const [url, seturl] = useState("");
  const socket = useSocket();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const getLastPart = (url) => {
    seturl(url);
    const parts = url.split("/");
    const lastPart = parts[parts.length - 1];
    setRoom(lastPart);
  };

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  const [roomID, setRoomID] = useState("");
  const generate_roomID = () => {
    length = 8;
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let roomID = "";
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      roomID += characters.charAt(randomIndex);
    }
    setRoomID(`${import.meta.env.VITE_FRONTEND}/room/${roomID}`);
  };
  const [selectedButton, setSelectedButton] = useState("New");

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };
  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className=" flex gap-6 mx-auto">
          <button
            className={`${
              selectedButton === "New"
                ? " bg-indigo-600 text-white"
                : " text-gray-800"
            } rounded-full p-3 text-lg font-bold`}
            onClick={() => handleButtonClick("New")}
          >
            New Meeting
          </button>
          <button
            className={`${
              selectedButton === "Code"
                ? " bg-indigo-600 text-white"
                : " text-gray-800"
            } rounded-full p-3 text-lg font-bold`}
            onClick={() => handleButtonClick("Code")}
          >
            Join using Link
          </button>
        </div>
        <div>
          {selectedButton === "New" && (
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white py-4 px-4 shadow sm:rounded-lg sm:px-6">
                <form className="space-y-6" onSubmit={handleSubmitForm}>
                  <div>
                    <label
                      htmlFor="roomId"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Meeting Link
                    </label>
                    <div className="mt-1">
                      <input
                        id="roomId"
                        name="roomId"
                        type="text"
                        value={roomID}
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={generate_roomID}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Create Meeting Link
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          {selectedButton === "Code" && (
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white py-4 px-4 shadow sm:rounded-lg sm:px-6">
                <form className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Join as
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="url"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Meeting Link
                    </label>
                    <div className="mt-1">
                      <input
                        id="url"
                        name="url"
                        type="text"
                        value={url}
                        onChange={(e) => getLastPart(e.target.value)}
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={handleSubmitForm}
                    >
                      Join
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LobbyScreen;
