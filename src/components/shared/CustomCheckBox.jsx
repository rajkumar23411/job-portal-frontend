import React from "react";

const CustomCheckBox = ({ checked, value, handleClick }) => {
    return (
        <input
            checked={checked}
            id={value}
            type="checkbox"
            value={value}
            className="peer h-5 w-5 border-2 border-light-3 rounded-full overflow-hidden appearance-none checked:after:content-['\2713'] checked:after:flex-center checked:after:h-full checked:after:w-full checked:after:base-regular checked:after:text-white hover:bg-light-3 checked:after:bg-primary-600 checked:border-primary-600"
            onChange={handleClick}
        />
    );
};

export default CustomCheckBox;
