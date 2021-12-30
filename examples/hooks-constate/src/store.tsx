import { useState, useEffect } from "react";
import constate from "constate";

const useApplicationState = (): {
  seconds: number;
  running: boolean;
  names?: string[];
  onToggle: () => void;
} => {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [data, setData] = useState<{
    names: string[];
  }>();

  useEffect(() => {
    if (running) {
      const timer = setInterval(() => {
        setSeconds((seconds) => seconds + 0.1);
      }, 100);
      return () => clearInterval(timer);
    }
  }, [running]);

  useEffect(() => {
    if (seconds > 2) {
      fetch("/names.json")
        .then((res) => res.json())
        .then((data) => setData(data));
    }
  }, [seconds > 2]);

  return {
    seconds,
    running,
    onToggle: () => setRunning((running) => !running),
    names: data?.names,
  };
};

export const [
  ApplicationContextProvider,
  useSeconds,
  useRunning,
  useToggle,
  useNames,
] = constate(
  useApplicationState,
  (state) => state.seconds,
  (state) => state.running,
  (state) => state.onToggle,
  (state) => state.names
);
