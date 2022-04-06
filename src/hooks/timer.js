import { useEffect, useState } from "react";

export const useInterval = (onEnd) => {
  const [timer, setTimer] = useState(null);
  useEffect(() => {
    if (timer === null) return;

    if (timer === 0) {
      onEnd();
      setTimer(null);
      return;
    }
    const intervalId = setTimeout(() => {
      console.log(timer);
      setTimer(timer - 1);
    }, 1000);
    return () => clearTimeout(intervalId);
  }, [timer]);
  return { timer, setTimer };
};
