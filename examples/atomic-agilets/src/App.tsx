import {useAgile} from "@agile-ts/react";

import {IS_RUNNING, NAMES, SECONDS, toggleTimer} from "./store";

const TimerDisplay: React.FunctionComponent = () => {
  const seconds = useAgile(SECONDS)
  return (
    <div className="text-3xl">
      <span className="mr-5 font-bold">Stopwatch:</span>
      <span className="font-mono">{seconds.toFixed(1)}</span>
    </div>
  );
};

const TimerToggle: React.FunctionComponent = () => {
  const isRunning = useAgile(IS_RUNNING);
  return (
    <div className="my-5">
      <button
        onClick={toggleTimer}
        className="bg-blue-700 text-white px-10 py-2 font-bold rounded-full text-3xl"
      >
        {isRunning ? "Stop" : "Start"}
      </button>
    </div>
  );
};

const Names: React.FunctionComponent = () => {
  const names = useAgile(NAMES)
  return names ? (
    <>
      <div className="text-3xl font-bold mb-5">Data</div>
      <div className="text-3xl font-mono">{JSON.stringify(names)}</div>
    </>
  ) : null;
};

const App: React.FunctionComponent = () => (
  <div className="mt-10 mx-auto max-w-3xl">
    <h1 className="font-bold text-5xl mb-5 border-b-2 border-gray-800">
      Atomic - AgileTs
    </h1>
    <TimerDisplay />
    <TimerToggle />
    <Names />
  </div>
);

export default App;
