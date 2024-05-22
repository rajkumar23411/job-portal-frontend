const JobTypeBox = ({ icon, value }) => {
    return (
        <div className="flex-center gap-2">
            <div className="text-2xl text-light-3">{icon}</div>
            <p className="base-regular capitalize text-light-2">{value}</p>
        </div>
    );
};

export default JobTypeBox;
