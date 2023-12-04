import React, { useState } from "react";
import * as HeroIcons from "@heroicons/react/24/outline";

function IconSelector({ onSelect }) {
  const [selectedIcon, setSelectedIcon] = useState(null);

  const handleIconSelect = (iconName) => {
    setSelectedIcon(iconName);
    onSelect(iconName);
  };

  const iconNames = Object.keys(HeroIcons); // Get an array of icon names
  return (
    <div>
      <div className="icon-grid grid grid-cols-5 gap-2 max-h-80 overflow-y-scroll">
        {iconNames.map((iconName) => (
          <div
            key={iconName}
            className={`icon ${selectedIcon === iconName ? "selected" : ""}`}
            onClick={() => handleIconSelect(iconName)}
          >
            {React.createElement(HeroIcons[iconName], {
              className: `h-6 w-6 stroke-gray-700`, // Apply Tailwind classes for size and color
              "aria-hidden": "true",
            })}
          </div>
        ))}
      </div>
      {selectedIcon && (
        <div>
          <h3>Selected Icon:</h3>
          {React.createElement(HeroIcons[selectedIcon], {
            className: `h-6 w-6 stroke-gray-700`, // Apply Tailwind classes for size and color
          })}
        </div>
      )}
    </div>
  );
}

export default IconSelector;
