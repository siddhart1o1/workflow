import { useState, useEffect } from "react";
import {
  CheckIcon,
  ChevronUpDownIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { Combobox } from "@headlessui/react";
import axios from "axios";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ComboBox({ head, topics, onupdateTopic }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setopen] = useState(false);
  const filtered =
    query === ""
      ? topics
      : topics.filter((data) => {
          return data.name.toLowerCase().includes(query.toLowerCase());
        });

  const handleSelect = (e) => {
    setSelected(e);
    onupdateTopic(e);
  };
  console.log(selected);
  return (
    <Combobox as="div" value={selected} onChange={(e) => handleSelect(e)}>
      <Combobox.Label className="flex text-sm font-medium text-gray-700">
        {head}
      </Combobox.Label>
      <div className="relative mt-1">
        <Combobox.Input
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(data) => data.name}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>
        {filtered.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filtered.map((data) => (
              <Combobox.Option
                key={data.id}
                value={data}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-indigo-600 text-white" : "text-gray-900"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span
                      className={classNames(
                        "block truncate",
                        selected && "font-semibold"
                      )}
                    >
                      {data.name.charAt(0).toUpperCase() + data.name.slice(1)}
                    </span>

                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-indigo-600"
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}
