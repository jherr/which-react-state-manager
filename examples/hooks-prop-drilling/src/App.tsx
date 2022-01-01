import React from "react";

import { useApplicationState } from "./store";

const TimerDisplay: React.FunctionComponent<{
  seconds: number;
}> = ({ seconds }) => (
  <div className="text-3xl">
    <span className="mr-5 font-bold">Stopwatch:</span>
    <span className="font-mono">{seconds.toFixed(1)}</span>
  </div>
);

const TimerToggle: React.FunctionComponent<{
  running: boolean;
  onToggle: () => void;
}> = ({ running, onToggle }) => (
  <div className="my-5">
    <button
      onClick={onToggle}
      className="bg-blue-700 text-white px-10 py-2 font-bold rounded-full text-3xl"
    >
      {running ? "Stop" : "Start"}
    </button>
  </div>
);

const Names: React.FunctionComponent<{
  names?: string[];
}> = ({ names }) =>
  names ? (
    <>
      <div className="text-3xl font-bold mb-5">Data</div>
      <div className="text-3xl font-mono">{JSON.stringify(names)}</div>
    </>
  ) : null;

function App() {
  const { seconds, running, names, onToggle } = useApplicationState();
  return (
    <div className="mt-10 mx-auto max-w-3xl">
      <h1 className="font-bold text-5xl mb-5 border-b-2 border-gray-800">
        Hooks - Prop Drilling
      </h1>
      <TimerDisplay seconds={seconds} />
      <TimerToggle running={running} onToggle={onToggle} />
      <Names names={names} />
    </div>
  );
}

export default App;
