import { useEffect } from "react";
import createStore from "teaful";

export const { useStore } = createStore<{
  stopwatch: {
    seconds: number;
    running: boolean;
  };
  names: string[];
}>({
  stopwatch: {
    seconds: 0,
    running: false,
  },
  names: [],
});

export const useStopwatch = () => {
  const [seconds, setSeconds] = useStore.stopwatch.seconds();
  const [running] = useStore.stopwatch.running();

  useEffect(() => {
    if (running) {
      const timer = setInterval(() => {
        setSeconds((seconds) => seconds + 0.1);
      }, 100);
      return () => clearInterval(timer);
    }
  }, [running]);

  const [, setNames] = useStore.names();
  useEffect(() => {
    if (seconds > 2) {
      fetch("/names.json")
        .then((res) => res.json())
        .then(({ names }) => setNames(names));
    }
  }, [seconds > 2]);
};
