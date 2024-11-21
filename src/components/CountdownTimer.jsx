import React, { useEffect, useState } from 'react';

function CountdownTimer({ targetDate }) {
  const calculateTimeLeft = () => {
    const difference = + new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Clear interval on component unmount
  }, []);
 
 const formatNumber = (number) => String(number).padStart(2, '0');

  return (
    
    <div className="flex gap-x-5 font-body">
      
    <div className="flex flex-col">
      <p className="text-small1">Days</p>
      <p className="text-custom_h6">{formatNumber(timeLeft.days)}</p>
      
    </div>
    <span className="text-custom_h5 text-red-600 pt-3">:</span>
    <div className="flex flex-col">
      <p className="text-small1">Hours</p>
      <p className="text-custom_h6">{formatNumber(timeLeft.hours)}</p>
    </div>

    <span className="text-custom_h5 text-red-600 pt-3">:</span>

    <div className="flex flex-col">
      <p className="text-small1">Minutes</p>
      <p className="text-custom_h6">{formatNumber(timeLeft.minutes)}</p>
    </div>

    <span className="text-custom_h5 pt-3">:</span>
    
    <div className="flex flex-col">
      <p className="text-small1">Seconds</p>
      <p className="text-custom_h6">{formatNumber(timeLeft.seconds)}</p>
    </div>
  </div>
  );



}


export default CountdownTimer;
