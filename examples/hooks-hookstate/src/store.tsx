import { useEffect } from "react";
import { createState, useState } from "@hookstate/core";

export const seconds = createState(0);
export const running = createState(false);
export const names = createState<string[] | undefined>(undefined);

export const useStopwatch = () => {
  const secondsState = useState(seconds);
  const runningState = useState(running);

  useEffect(() => {
    if (runningState.get()) {
      const timer = setInterval(() => {
        secondsState.set((seconds) => seconds + 0.1);
      }, 100);
      return () => clearInterval(timer);
    }
  }, [runningState.get()]);

  useEffect(() => {
    if (secondsState.get() > 2) {
      fetch("/names.json")
        .then((res) => res.json())
        .then((data) => names.set(data.names));
    }
  }, [secondsState.get() > 2]);
};
