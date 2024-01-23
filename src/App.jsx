import { useRecoilState, atom } from "recoil";
import { useEffect } from "react";
import "./index.css";

const timerState = atom({
  key: "timerState",
  default: "null",
});

const hourState = atom({
  key: "hourState",
  default: 0,
});

const minuteState = atom({
  key: "minuteState",
  default: 0,
});

const secondState = atom({
  key: "secondState",
  default: 0,
});

function App() {
  const [timer, setTimer] = useRecoilState(timerState);
  const [hours, setHours] = useRecoilState(hourState);
  const [minutes, setMinutes] = useRecoilState(minuteState);
  const [seconds, setSeconds] = useRecoilState(secondState);

  const startStopWatch = () => {
    setTimer(setInterval(updateStopWatch, 1000));
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
        <div>
          <button onClick={startStopWatch}>Start</button>
          <button onClick={stopWatch}>Stop</button>
          <button onClick={resetStopWatch}>Reset</button>
        </div>
      </div>
    </>
  );
}

export default App;
