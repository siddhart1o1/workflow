import React, { useEffect, useCallback, useState } from "react";
import ReactPlayer from "react-player";
import peer from "../../services/peer";
import { useSocket } from "../Context";

const RoomPage = () => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [isCallActive, setIsCallActive] = useState(false); // Track call state

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined room`);
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
    setIsCallActive(true);
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`Incoming Call`, from, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      sendStreams();
      setIsCallActive(true);
    },
    [sendStreams]
  );
  const handleHangUp = useCallback(async () => {
    // Stop your own video stream
    if (myStream) {
      myStream.getTracks().forEach((track) => track.stop());
      setMyStream(null);
    }

    // Signal the other user to hang up
    if (remoteSocketId) {
      socket.emit("user:hangup", { to: remoteSocketId });
    }

    // Reset remote stream and call state
    setRemoteStream(null);
    setIsCallActive(false);
  }, [myStream, remoteSocketId, socket]);

  useEffect(() => {
    // Listen for the "user:hangup" event from the other user
    socket.on("user:hangup", () => {
      // Stop the remote user's stream
      if (remoteStream) {
        remoteStream.getTracks().forEach((track) => track.stop());
        setRemoteStream(null);
      }

      // Reset remote socket ID and call state
      setRemoteSocketId(null);
      setIsCallActive(false);
    });

    return () => {
      socket.off("user:hangup");
    };
  }, [socket, remoteStream]);

  const renderHangUpButton = () => {
    if (isCallActive) {
      return (
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-4"
          onClick={handleHangUp}
        >
          Hang Up
        </button>
      );
    }
  };

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      console.log("GOT TRACKS!!");
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);
  // useEffect(() => {
  //   const handlePageUnload = () => {
  //     // Stop your own video stream
  //     if (myStream) {
  //       myStream.getTracks().forEach((track) => track.stop());
  //       setMyStream(null);
  //     }

  //     // Signal the other user to hang up
  //     if (remoteSocketId) {
  //       socket.emit("user:hangup", { to: remoteSocketId });
  //     }
  //     // Reset remote stream and call state
  //     setRemoteStream(null);
  //     setIsCallActive(false);
  //   };

  //   window.addEventListener("beforeunload", handlePageUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handlePageUnload);
  //   };
  // }, [myStream, remoteSocketId, socket]);

  return (
    <>
      <div className=" h-full bg-gray-100">
        <div className=" h-full">
          <div>
            <div className="">
              <h1 className=" mt-4 py-2 pl-2 text-xl font-medium text-white italic bg-indigo-500 ">
                Room
              </h1>
              <div className="max-w-7xl mx-auto flex flex-col px-4 my-4 ">
                <main className="flex-1 bg-white rounded-lg">
                  <div className="relative  justify-evenly gap-3 flex p-5">
                    <div className="flex h-screen bg-gray-200 mx-auto">
                      {/* Remote Screen (larger) */}
                      {remoteStream && (
                        <div className="flex-1 bg-black relative">
                          <ReactPlayer
                            url={remoteStream}
                            playing
                            muted
                            width="100%"
                            height="100%"
                          />
                        </div>
                      )}

                      {/* Your Stream (smaller) */}
                      {myStream && (
                        <div className="absolute bottom-2 right-2">
                          <ReactPlayer
                            url={myStream}
                            playing
                            muted
                            width="240px"
                            height="180px"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className=" flex gap-4 justify-center">
                    <h4 className="text-sm mb-2 text-gray-400">
                      {remoteSocketId ? "Connected" : "No one in room"}
                    </h4>
                    {myStream && !isCallActive && (
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                        onClick={sendStreams}
                      >
                        Send Stream
                      </button>
                    )}
                    {remoteSocketId && !isCallActive && (
                      <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
                        onClick={handleCallUser}
                      >
                        CALL
                      </button>
                    )}
                    {renderHangUpButton()}
                  </div>
                </main>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomPage;
