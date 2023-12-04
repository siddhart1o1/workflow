import axios from "axios";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

function Invite(props) {
  const [email, set_email] = useState("");
  const details = JSON.parse(sessionStorage.getItem("userDetails"));
  useEffect(() => {
    const details = JSON.parse(sessionStorage.getItem("userDetails"));
    if (details.user.role !== "Interviewer") {
      navigate("/unauthorized");
    }
  }, []);
  const sendInvite = () => {
    console.log(email);
    axios
      .post(
        "/interviewer/invite",
        { email },
        {
          headers: {
            Authorization: "Bearer " + details.token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        toast.success("Invite Sent Successfully");
        set_email("");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Some Error Occured");
      });
  };

  return (
    <div className=" h-full bg-gray-100">
      <div className=" h-full">
        <Toaster />
        <h1 className=" mt-4 py-2 pl-2 text-xl font-medium text-white italic bg-indigo-500 ">
          Invite
        </h1>
        <div className="max-w-4xl mx-auto flex flex-col md:px-8 xl:px-0 my-4 ">
          <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-xl">
            <div className="bg-white py-8 px-4 sm:rounded-lg sm:px-10">
              <h2 className="my-3 text-center text-3xl font-extrabold text-gray-900">
                Send Invitation to other interviewers using e-mail
              </h2>
              <form className="space-y-6" action="#" method="POST">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      autoComplete="email"
                      onChange={(e) => set_email(e.target.value)}
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => sendInvite()}
                    className={` w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-50 `}
                  >
                    Invite
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Invite;
