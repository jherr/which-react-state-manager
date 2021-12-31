import { useStopwatch, names, running, seconds } from "./store";
import { useState } from "@hookstate/core";

const TimerDisplay: React.FunctionComponent = () => {
  const secondsState = useState(seconds);
  return (
    <div className="text-3xl">
      <span className="mr-5 font-bold">Stopwatch:</span>
      <span className="font-mono">{secondsState.get().toFixed(1)}</span>
    </div>
  );
};

const TimerToggle: React.FunctionComponent = () => {
  useStopwatch();
  const runningState = useState(running);
  return (
    <div className="my-5">
      <button
        onClick={() => runningState.set(!runningState.get())}
        className="bg-blue-700 text-white px-10 py-2 font-bold rounded-full text-3xl"
      >
        {runningState.get() ? "Stop" : "Start"}
      </button>
    </div>
  );
};

const Names: React.FunctionComponent = () => {
  const namesState = useState(names);
  return names ? (
    <>
      <div className="text-3xl font-bold mb-5">Data</div>
      <div className="text-3xl font-mono">
        {JSON.stringify(namesState.get())}
      </div>
    </>
  ) : null;
};

const App: React.FunctionComponent = () => (
  <div className="mt-10 mx-auto max-w-3xl">
    <h1 className="font-bold text-5xl mb-5 border-b-2 border-gray-800">
      Hooks - Hookstate
    </h1>
    <TimerDisplay />
    <TimerToggle />
    <Names />
  </div>
);

export default App;
