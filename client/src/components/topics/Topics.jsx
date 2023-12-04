import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AcademicCapIcon,
  TruckIcon,
  ClipboardDocumentIcon,
  ClockIcon,
  ReceiptPercentIcon,
  ComputerDesktopIcon,
  CalculatorIcon,
  CodeBracketIcon,
  LanguageIcon,
  LightBulbIcon,
  ScaleIcon,
  WrenchScrewdriverIcon,
  CogIcon,
} from "@heroicons/react/24/outline";
import { useParams } from "react-router-dom";
import axios from "axios";
import DynamicHeroIcon from "../DynamicSVG";
import SEO from "../../SEO";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const actions = [];

function Topics(props) {
  const navigate = useNavigate();
  const { topic } = useParams();
  console.log(topic);
  const [entries, set_entries] = useState([]);
  useEffect(() => {
    var a = sessionStorage.getItem("userDetails");
    if (!a) {
      navigate("/login");
    }
    axios
      .get(`/topic-subtopic/get/${topic}`)
      .then((res) => {
        console.log(res);
        set_entries(res.data.subtopicsOfTargetTopic);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(entries);
  actions.length = 0;
  // if (topic === "technical") {
  //   actions.push(
  //     {
  //       title: "Technical",
  //       href: "/technical/tech",
  //       icon: ComputerDesktopIcon,
  //       iconForeground: "text-rose-700",
  //       iconBackground: "bg-rose-50",
  //     },
  //     {
  //       title: "Coding",
  //       href: "/technical/coding",
  //       icon: CodeBracketIcon,
  //       iconForeground: "text-indigo-700",
  //       iconBackground: "bg-indigo-50",
  //     }
  //   );
  // } else if (topic === "aptitude") {
  //   actions.push(
  //     {
  //       title: "Problems on Age",
  //       href: "/aptitude/age",
  //       icon: ClockIcon,
  //       iconForeground: "text-rose-700",
  //       iconBackground: "bg-rose-50",
  //     },
  //     {
  //       title: "Problems on Time and Work ",
  //       href: "/aptitude/work",
  //       icon: WrenchScrewdriverIcon,
  //       iconForeground: "text-indigo-700",
  //       iconBackground: "bg-indigo-50",
  //     },
  //     {
  //       title: "Problems on Time and Distance ",
  //       href: "/aptitude/distance",
  //       icon: TruckIcon,
  //       iconForeground: "text-indigo-700",
  //       iconBackground: "bg-indigo-50",
  //     },
  //     {
  //       title: " Ratio and Proportions ",
  //       href: "/aptitude/ratio",
  //       icon: AcademicCapIcon,
  //       iconForeground: "text-indigo-700",
  //       iconBackground: "bg-indigo-50",
  //     },
  //     {
  //       title: "Percentage ",
  //       href: "/aptitude/percentage",
  //       icon: ReceiptPercentIcon,
  //       iconForeground: "text-indigo-700",
  //       iconBackground: "bg-indigo-50",
  //     },
  //     {
  //       title: "Average",
  //       href: "/aptitude/average",
  //       icon: ClipboardDocumentIcon,
  //       iconForeground: "text-rose-700",
  //       iconBackground: "bg-rose-50",
  //     }
  //   );
  // } else if (topic === "verbal") {
  //   actions.push({
  //     title: "Language",
  //     href: "/verbal/language",
  //     icon: LanguageIcon,
  //     iconForeground: "text-rose-700",
  //     iconBackground: "bg-rose-50",
  //   });
  // } else if (topic === "reasoning") {
  //   actions.push(
  //     {
  //       title: "Logical reasoning",
  //       href: "/reasoning/logical",
  //       icon: ScaleIcon,
  //       iconForeground: "text-rose-700",
  //       iconBackground: "bg-rose-50",
  //     },
  //     {
  //       title: "Non Verbal reasoning",
  //       href: "/reasoning/non-verbal",
  //       icon: LightBulbIcon,
  //       iconForeground: "text-rose-700",
  //       iconBackground: "bg-rose-50",
  //     },
  //     {
  //       title: "Verbal reasoning",
  //       href: "/reasoning/verbal",
  //       icon: CogIcon,
  //       iconForeground: "text-rose-700",
  //       iconBackground: "bg-rose-50",
  //     }
  //   );
  // }
  console.log(topic);
  return (
    <>
      <SEO
        title={`Practice ${topic}.`}
        description="Choose from list to practice each topic."
        name="workflow"
        type="article"
      />
      <main className="flex-1 bg-gray-100">
        <h1 className=" mt-4 py-2 pl-2 text-xl font-medium text-white italic bg-indigo-500 ">
          {topic.charAt(0).toUpperCase() + topic.slice(1)}{" "}
        </h1>
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 ">
              {entries.map((itm) => (
                <div
                  key={itm.name}
                  className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <DynamicHeroIcon icon={itm.subtopic_icon} />
                  {/* <itm.icon
                  className="h-6 w-6 stroke-gray-700 "
                  aria-hidden="true"
                /> */}

                  <div className="flex-1 min-w-0">
                    <a
                      href={`${topic}/${itm.name}`}
                      className="focus:outline-none"
                    >
                      <span className="absolute inset-0" aria-hidden="true" />
                      <p className="text-sm font-medium text-gray-900">
                        {itm.name.charAt(0).toUpperCase() + itm.name.slice(1)}{" "}
                      </p>
                      {/* <p className="text-sm text-gray-500 truncate">{itm.role}</p> */}
                    </a>
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

export default Topics;
