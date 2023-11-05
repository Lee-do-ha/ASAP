import React, { useState, useEffect } from 'react';

interface ITime {
  mm: number;
  ss: number;
}

function Timer({ mm, ss }: ITime) {
  const [minutes, setMinutes] = useState(mm);
  const [seconds, setSeconds] = useState(ss);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(countdown);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  return (
    <p className="text-blue font-medium flex items-center me-2">
      {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </p>
  );
}

export default Timer;
