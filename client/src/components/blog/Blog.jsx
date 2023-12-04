import { Link, useNavigate } from "react-router-dom";
import {
  PencilSquareIcon,
  HeartIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import SEO from "../../SEO";
import BlogFilter from "./BlogFilter";
import toast, { Toaster } from "react-hot-toast";

export default function Blog() {
  const navigate = useNavigate();
  const details = JSON.parse(sessionStorage.getItem("userDetails"));
  const [open, setOpen] = useState(false);
  const [blog, set_blog] = useState([]);
  const [filter, setFilter] = useState([
    { sectionId: "category", values: [] }, // Initialize with empty arrays for each section
    { sectionId: "by", values: [] },
  ]);
  const [sort, setSort] = useState("");
  const buildQueryString = (filter, sorting) => {
    const uniqueFilterValues = {}; // Object to track unique values for each section

    // Iterate through the filter array and build the filterQueryString
    const filterQueryString = filter
      .map((item) => {
        const values = item.values.join(","); // Join values with commas

        // Check if the values already exist for this section
        if (uniqueFilterValues[item.sectionId] === undefined) {
          uniqueFilterValues[item.sectionId] = values;
        } else {
          // Merge the values while avoiding duplicates
          uniqueFilterValues[item.sectionId] = [
            ...new Set([
              ...uniqueFilterValues[item.sectionId].split(","),
              ...values.split(","),
            ]),
          ].join(",");
        }

        return `${item.sectionId}=${uniqueFilterValues[item.sectionId]}`;
      })
      .join("&"); // Join filter parameters with "&" separator

    const sortingQueryString = `sort=${sorting}`;

    return `${filterQueryString}&${sortingQueryString}`;
  };
  const fetchData = () => {
    const filterQueryString = buildQueryString(filter, sort);
    const apiUrl = `/blog/get?${filterQueryString}`;
    axios
      .get(apiUrl)
      .then((res) => {
        console.log(res);
        set_blog(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleLike = (blog_id) => {
    axios
      .post(
        "/blog/like",
        { blog_id },
        {
          headers: {
            Authorization: "Bearer " + details.token,
          },
        }
      )
      .then((res) => {
        fetchData();
      })
      .catch((err) => {
        console.log(er);
      });
  };
  const handleDelete = (blog_id) => {
    axios
      .post(
        "/blog/delete",
        { blog_id },
        {
          headers: {
            Authorization: "Bearer " + details.token,
          },
        }
      )
      .then((res) => {
        toast.success("Blog deleted");
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData();
  }, [filter, sort]);

  return (
    <>
      <SEO
        title="Blog for discussion"
        description="Post your experience, opinion or discuss with other participants!"
        name="workflow"
        type="article"
      />
      <main className="flex-1 bg-gray-100">
        <Toaster />
        <div className=" my-4 flex justify-between items-center bg-indigo-500">
          <h1 className=" py-2 pl-2 text-xl font-medium text-white italic bg-indigo-500">
            {/* {topic.charAt(0).toUpperCase() + topic.slice(1)}{" "} */}
            Blog
          </h1>
          <Link to={"/blog/form"}>
            <button>
              <PencilSquareIcon className="h-6 w-6 text-white mx-4 hover:bg-indigo-600 rounded-lg" />
            </button>
          </Link>
        </div>
        <div className="max-w-4xl mx-auto flex flex-col md:px-8 xl:px-0 my-4 ">
          <BlogFilter
            filter={filter}
            setFilter={setFilter}
            sort={sort}
            setSort={setSort}
          />
          <div className="space-y-6">
            <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
              {blog.map((itm) => (
                <div className=" mb-10">
                  <p className="text-sm text-gray-500">
                    {/* <time dateTime={itm.datetime}>{itm.date}</time> */}
                    {new Date(itm.date).toLocaleDateString("en-GB")}
                  </p>

                  <p className="text-xl font-semibold text-gray-900">
                    {itm.title}
                  </p>
                  <p className="mt-3 text-base text-gray-500">{itm.content}</p>

                  <div className="mt-3 flex">
                    {itm.author === details.user.email ? (
                      <button onClick={() => handleDelete(itm._id)}>
                        <TrashIcon
                          className=" text-gray-500   flex-shrink-0 h-6 w-6 hover:cursor-pointer hover:text-red-500"
                          aria-hidden="true"
                        />
                      </button>
                    ) : (
                      <></>
                    )}
                    <button
                      onClick={() => handleLike(itm._id)}
                      className=" flex "
                    >
                      <HeartIcon
                        className={`h-6 w-6 cursor-pointer ${
                          itm.likes.includes(details.user.id)
                            ? `fill-red-500`
                            : ``
                        } rounded-lg`}
                      />
                      <span className=" mt-1 text-xs">{itm.likes.length}</span>
                    </button>
                    <p className=" ml-2 text-base font-semibold text-indigo-600 hover:text-indigo-500">
                      {itm.author}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
