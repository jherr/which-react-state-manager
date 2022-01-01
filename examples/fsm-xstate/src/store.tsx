import React, { createContext, useContext } from "react";
import { useMachine } from "@xstate/react";
import { createMachine } from "xstate";

type StopwatchEvent = { type: "TOGGLE" } | { type: "TICK" };
type StopwatchContext = {
  seconds: number;
  names?: string[];
};

const stopwatchMachine = createMachine<StopwatchContext, StopwatchEvent>({
  id: "stopwatch",
  initial: "stopped",
  context: {
    seconds: 0,
  },
  states: {
    stopped: {
      on: { TOGGLE: "started" },
    },
    started: {
      invoke: {
        src: () => (cb) => {
          const interval = setInterval(() => cb("TICK"), 100);
          return () => {
            clearInterval(interval);
          };
        },
      },
      on: {
        TOGGLE: "stopped",
        TICK: {
          actions: (context) => {
            context.seconds += 0.1;
            if (context.seconds > 2 && !context.names) {
              fetch("/names.json")
                .then((res) => res.json())
                .then(({ names }) => (context.names = names));
            }
          },
        },
      },
    },
  },
});

interface ApplicationState extends StopwatchContext {
  running: boolean;
  onToggle: () => void;
}

const ApplicationContext = createContext<ApplicationState>({
  seconds: 0,
  running: false,
  onToggle: () => {},
});

const useApplicationState = (): ApplicationState => {
  const [state, send] = useMachine(stopwatchMachine);

  return {
    seconds: state.context.seconds,
    names: state.context.names,
    running: state.value !== "stopped",
    onToggle: () => send("TOGGLE"),
  };
};

export const ApplicationContextProvider: React.FunctionComponent = ({
  children,
}) => (
  <ApplicationContext.Provider value={useApplicationState()}>
    {children}
  </ApplicationContext.Provider>
);

export const useApplicationContext = () => useContext(ApplicationContext);
