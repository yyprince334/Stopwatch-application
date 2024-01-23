import { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [timer, setTimer] = useState(null);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const startStopWatch = () => {
    setTimer(setInterval(updateStopWatch, 20));
  };

  const stopWatch = () => {
    clearInterval(timer);
  };

  const resetStopWatch = () => {
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    clearInterval(timer);
  };

  const updateStopWatch = () => {
    setSeconds((prevSeconds) => {
      const newSecond = prevSeconds >= 60 ? 0 : prevSeconds + 1;
      if (newSecond === 0) {
        setMinutes((prevMinutes) => {
          const newMinutes = prevMinutes >= 60 ? 0 : prevMinutes + 1;
          if (newMinutes === 0) {
            setHours((prevHours) => prevHours + 1);
          }
          return newMinutes;
        });
      }
      return newSecond;
    });
  };

  useEffect(() => {
    return () => {
      clearInterval(timer);
    };
  }, [timer]);

  return (
    <>
      <div className="stopwatch">
        <div className="display">{`${String(hours).padStart(2, "0")}:${String(
          minutes
        ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`}</div>
        <button onClick={startStopWatch}>Start</button>
        <button onClick={stopWatch}>Stop</button>
        <button onClick={resetStopWatch}>Reset</button>
      </div>
    </>
  );
}

export default App;
