const JobInfoBox = ({ icon, name, value }) => {
    return (
        <div className="flex items-start gap-2">
            <div className="text-2xl text-light-4">{icon}</div>
            <div className="flex flex-col gap-1">
                <p className="text-gray-400 small-regular">{name}</p>
                <p
                    className={`base-regular text-light-2 ${
                        value === "fresher" ? "capitalize" : ""
                    }`}
                >
                    {value}
                </p>
            </div>
        </div>
    );
};

export default JobInfoBox;
