import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function BlogForm() {
  const navigate = useNavigate();
  const [form, set_form] = useState({
    title: "",
    content: "",
  });
  const [option, set_option] = useState("");
  const handleOptionChange = (event) => {
    set_option(event.target.value);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    set_form((prevdata) => {
      return {
        ...prevdata,
        [name]: value,
      };
    });
  };
  const details = JSON.parse(sessionStorage.getItem("userDetails"));
  const handleSubmit = (e) => {
    console.log(form, option);
    axios
      .post(
        "/blog/add",
        { form, option },
        {
          headers: {
            Authorization: "Bearer " + details.token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        navigate("/blogs");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className=" h-full bg-gray-100">
      <div className=" h-full">
        <div>
          <div className="">
            <h1 className=" mt-4 py-2 pl-2 text-xl font-medium text-white italic bg-indigo-500 ">
              Form
            </h1>
            <div className="max-w-4xl mx-auto flex flex-col md:px-8 xl:px-0 my-4 ">
              <div className="space-y-6">
                <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
                  <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Blog
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        This information will be displayed publicly so be
                        careful what you share.
                      </p>
                    </div>
                    <div className="mt-5 md:mt-0 md:col-span-2">
                      <form className="space-y-6" action="#" method="POST">
                        <div className="grid grid-cols-3 gap-6">
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
                            Brief description for your experience or opinion.
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
                                id="experience"
                                name="category"
                                type="radio"
                                value={"experience"}
                                checked={option === "experience"}
                                onChange={(e) => handleOptionChange(e)}
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                              />
                              <label
                                htmlFor="experience"
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
                        </fieldset>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={(e) => handleSubmit(e)}
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
