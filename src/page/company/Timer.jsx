import { useState, useEffect } from "react";

const Timer = ({ duration }) => {
    // set timer for 30 minutes
    const [time, setTime] = useState(duration * 60 || 1200); // 1 hour in seconds

    useEffect(() => {
        const timerId = setInterval(() => {
            setTime((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timerId);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timerId); // Cleanup the interval on component unmount
    }, [duration]);

    const formatTime = (timeInSeconds) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;

        const pad = (num) => String(num).padStart(2, "0");

        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    };

    return (
        <div className="bg-primary-600/20 text-center w-max px-6 py-3 rounded-xl mx-auto animate-pulse">
            <div className="h1-semibold">{formatTime(time)}</div>
            <p className="small-regular text-light-3">Time remaining</p>
        </div>
    );
};

export default Timer;
