import { useState, useEffect } from "react";

interface ApplicationState {
  seconds: number;
  running: boolean;
  names?: string[];
  onToggle: () => void;
}

export const useApplicationState = (): ApplicationState => {
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
