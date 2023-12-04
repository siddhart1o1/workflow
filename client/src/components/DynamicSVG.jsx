import * as HIcons from "@heroicons/react/24/outline";

const DynamicHeroIcon = (props) => {
  const { ...icons } = HIcons;
  const TheIcon = icons[props.icon];

  return (
    <>
      <TheIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
    </>
  );
};

export default DynamicHeroIcon;
