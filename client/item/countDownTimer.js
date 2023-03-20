import React, { useState, useEffect } from 'react';

function CountdownTimer({ minutes, seconds, onComplete }) {
  const [timeLeft, setTimeLeft] = useState({ minutes: minutes, seconds: seconds });

  useEffect(() => {
    const timer =
      timeLeft.minutes > 0 || timeLeft.seconds > 0
        ? setInterval(() => {
            setTimeLeft({
              minutes: timeLeft.seconds > 0 ? timeLeft.minutes : timeLeft.minutes - 1,
              seconds: timeLeft.seconds > 0 ? timeLeft.seconds - 1 : 59,
            });
          }, 1000)
        : onComplete();

    return () => clearInterval(timer);
  }, [timeLeft, onComplete]);

  return (
    <div>
      {timeLeft.minutes}:{timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}
    </div>
  );
}

export default CountdownTimer;