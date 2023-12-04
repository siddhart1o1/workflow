import React from "react";
import { Fragment, useState } from "react";
import {
  Dialog,
  Disclosure,
  Menu,
  Popover,
  Transition,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

const sortOptions = [{ name: "Most Likes" }, { name: "Newest" }];
const filters = [
  {
    id: "category",
    name: "Category",
    options: [
      { value: "discussion", label: "Discussion" },
      { value: "opinion", label: "Opinion" },
      { value: "experience", label: "Experience" },
    ],
  },
  {
    id: "by",
    name: "By",
    options: [
      { value: "Interviewer", label: "Interviewer" },
      { value: "User", label: "User" },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function BlogFilter({ filter, setFilter, sort, setSort }) {
  const [open, setOpen] = useState(false);

  //   const handleCheckboxChange = (sectionId, value) => {
  //     // Find the category filter with the same sectionId
  //     const categoryFilter = filter.find((item) => item.sectionId === sectionId);

  //     if (categoryFilter) {
  //       // If the category filter exists, update its values array
  //       const updatedFilter = filter.map((item) =>
  //         item.sectionId === sectionId
  //           ? { ...item, values: [...item.values, value] }
  //           : item
  //       );
  //       setFilter(updatedFilter);
  //     } else {
  //       // If the category filter does not exist, create a new filter
  //       setFilter([...filter, { sectionId, values: [value] }]);
  //     }
  //   };
  const handleCheckboxChange = (e, sectionId, optionValue, sectionIdx) => {
    // Create a copy of the filter state
    const updatedFilter = [...filter];

    if (e.target.checked) {
      // If checked, add the optionValue to the section's values
      updatedFilter[sectionIdx].values.push(optionValue);
    } else {
      // If unchecked, remove the optionValue from the section's values
      const optionIndex = updatedFilter[sectionIdx].values.indexOf(optionValue);
      if (optionIndex !== -1) {
        updatedFilter[sectionIdx].values.splice(optionIndex, 1);
      }
    }

    // Update the filter state
    setFilter(updatedFilter);
  };

  return (
    <div>
      <div className="bg-gray-100">
        {/* Mobile filter dialog */}
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 sm:hidden"
            onClose={setOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-6 flex flex-col overflow-y-auto">
                <div className="px-4 flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4">
                  {filters.map((section, sectionIdx) => (
                    <Disclosure
                      as="div"
                      key={section.name}
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                <ChevronDownIcon
                                  className={classNames(
                                    open ? "-rotate-180" : "rotate-0",
                                    "h-5 w-5 transform"
                                  )}
                                  aria-hidden="true"
                                />
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {section.options.map((option, optionIdx) => (
                                // <div
                                //   key={option.value}
                                //   className="flex items-center"
                                // >
                                //   <input
                                //     id={`filter-mobile-${section.id}-${optionIdx}`}
                                //     name={`${section.id}[]`}
                                //     defaultValue={option.value}
                                //     type="checkbox"
                                //     className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                //   />
                                //   <label
                                //     htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                //     className="ml-3 text-sm text-gray-500"
                                //   >
                                //     {option.label}
                                //   </label>
                                // </div>
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    value={option.value}
                                    checked={filter[sectionIdx].values.includes(
                                      option.value
                                    )} // Check if the value is in the state for the current section
                                    onChange={
                                      (e) =>
                                        handleCheckboxChange(
                                          e,
                                          section.id,
                                          option.value,
                                          sectionIdx
                                        ) // Pass the section index
                                    }
                                    type="checkbox"
                                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                    className="ml-3 pr-6 text-sm font-medium text-gray-900 whitespace-nowrap"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </div>
            </Transition.Child>
          </Dialog>
        </Transition.Root>

        <div className="max-w-4xl mx-auto px-2 text-center">
          <section aria-labelledby="filter-heading" className=" py-3">
            <h2 id="filter-heading" className="sr-only">
              Product filters
            </h2>

            <div className="flex items-center justify-between">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-left absolute left-0 z-10 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option}>
                          {({ active }) => (
                            <button
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm font-medium text-gray-900"
                              )}
                              onClick={() => setSort(option.name)}
                            >
                              {option.name}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden"
                onClick={() => setOpen(true)}
              >
                Filters
              </button>

              <Popover.Group className="hidden sm:flex sm:items-baseline sm:space-x-8">
                {filters.map((section, sectionIdx) => (
                  <Popover
                    as="div"
                    key={section.name}
                    id="desktop-menu"
                    className="relative z-0 inline-block text-left"
                  >
                    <div>
                      <Popover.Button className="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                        <span>{section.name}</span>
                        {sectionIdx === 0 ? <></> : null}
                        <ChevronDownIcon
                          className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                      </Popover.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Popover.Panel className="origin-top-right absolute right-0 mt-2 bg-white rounded-md shadow-2xl p-4 ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <form className="space-y-4">
                          {section.options.map((option, optionIdx) => (
                            <div
                              key={option.value}
                              className="flex items-center"
                            >
                              <input
                                id={`filter-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                value={option.value}
                                checked={filter[sectionIdx].values.includes(
                                  option.value
                                )} // Check if the value is in the state for the current section
                                onChange={
                                  (e) =>
                                    handleCheckboxChange(
                                      e,
                                      section.id,
                                      option.value,
                                      sectionIdx
                                    ) // Pass the section index
                                }
                                type="checkbox"
                                className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor={`filter-${section.id}-${optionIdx}`}
                                className="ml-3 pr-6 text-sm font-medium text-gray-900 whitespace-nowrap"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </form>
                      </Popover.Panel>
                    </Transition>
                  </Popover>
                ))}
              </Popover.Group>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default BlogFilter;
