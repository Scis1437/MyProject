import React, { useState, useEffect } from "react";

function CountdownTimer({ minutes }) {
  const [timeLeft, setTimeLeft] = useState({
    minutes: minutes,
    seconds: 0,
  });

  useEffect(() => {
    let interval = null;

    if (timeLeft.minutes === 0 && timeLeft.seconds === 0) {
      clearInterval(interval);
      alert("time out!");
      // Handle countdown completion here
    } else {
      interval = setInterval(() => {
        if (timeLeft.seconds === 0) {
          setTimeLeft({
            minutes: timeLeft.minutes - 1,
            seconds: 59,
          });
        } else {
          setTimeLeft({
            minutes: timeLeft.minutes,
            seconds: timeLeft.seconds - 1,
          });
        }
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [timeLeft]);

  return (
    <div>
      {timeLeft.minutes}:{timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}
    </div>
  );
}

export default CountdownTimer;
