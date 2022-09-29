import React, { useState, createContext, useContext } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { useInterval } from "react-use";

interface ApplicationState {
  seconds: number;
  running: boolean;
  names?: string[];
  onToggle: () => void;
}

const ApplicationContext = createContext<ApplicationState>({
  seconds: 0,
  running: false,
  onToggle: () => {},
});

const useApplicationState = (): ApplicationState => {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const { data } = useQuery<{
    names: string[];
  }>("names", () => fetch("/names.json").then((res) => res.json()), {
    enabled: seconds > 2,
  });

  useInterval(
    () => setSeconds((seconds) => seconds + 0.1),
    running ? 100 : null
  );

  return {
    seconds,
    running,
    onToggle: () => setRunning((running) => !running),
    names: data?.names,
  };
};

const queryClient = new QueryClient();

const StopwatchContextProvider: React.FunctionComponent = ({ children }) => (
  <ApplicationContext.Provider value={useApplicationState()}>
    {children}
  </ApplicationContext.Provider>
);

export const ApplicationContextProvider: React.FunctionComponent = ({
  children,
}) => (
  <QueryClientProvider client={queryClient}>
    <StopwatchContextProvider>{children}</StopwatchContextProvider>
  </QueryClientProvider>
);

export const useApplicationContext = () => useContext(ApplicationContext);
