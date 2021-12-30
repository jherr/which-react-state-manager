import { useEffect } from "react";
import { createGlobalState } from "react-hooks-global-state";

const { useGlobalState } = createGlobalState<{
  seconds: number;
  running: boolean;
  names?: string[];
}>({
  seconds: 0,
  running: false,
  names: undefined,
});

export const useSeconds = () => useGlobalState("seconds");
export const useRunning = () => useGlobalState("running");
export const useNames = () => useGlobalState("names");

export const useStopWatch = () => {
  const [seconds, setSeconds] = useSeconds();
  const [running] = useRunning();

  useEffect(() => {
    if (running) {
      const timer = setInterval(() => {
        setSeconds((seconds) => seconds + 0.1);
      }, 100);
      return () => clearInterval(timer);
    }
  }, [running]);

  const [, setNames] = useNames();
  useEffect(() => {
    if (seconds > 2) {
      fetch("/names.json")
        .then((res) => res.json())
        .then((data) => setNames(data));
    }
  }, [seconds > 2]);
};
