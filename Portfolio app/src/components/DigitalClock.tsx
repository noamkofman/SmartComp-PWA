import React, { useState, useEffect } from 'react';

function DigitalClock() {
  // 1. Initialize state with the current time string
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    // 2. Set up an interval to update the state every 1000ms (1 second)
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    // 3. Clean up the interval when the component unmounts to prevent memory leaks
    return () => clearInterval(timer);
  }, []);
  
  // 4. Render the time in JSX
  const hours = time[0] + time[1];
  const minutes =  time[2] + time[3] + time[4];
  return (
    <div className="clock-container">
      <h2>Current Time: {hours}{minutes}</h2>
    </div>
  
  

  );
}

export default DigitalClock;
