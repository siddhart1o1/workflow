import React from "react";
import SEO from "../SEO";

function Unauthorized(props) {
  return (
    <>
      <SEO
        title="Unauthorized with Login Restart your journey"
        description="Restart yhour journey for placement"
        name="workflow"
        type="article"
      />
      <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 mt-9">
        <div className="flex-shrink-0 flex justify-center">
          <a href="/" className="inline-flex">
            <span className="sr-only">Workflow</span>
            <img
              className="h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
              alt=""
            />
          </a>
        </div>
        <div className="py-16">
          <div className="text-center">
            <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">
              401 error
            </p>
            <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
              Unauthorized
            </h1>
            <p className="mt-2 text-base text-gray-500">
              Sorry, we can't load the page you’re looking for.
            </p>
            <div className="mt-6">
              <a
                href="/home"
                className="text-base font-medium text-indigo-600 hover:text-indigo-500"
              >
                Go back home<span aria-hidden="true"> &rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Unauthorized;
