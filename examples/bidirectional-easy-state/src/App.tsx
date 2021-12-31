import { useEffect } from "react";
import { view } from "@risingstack/react-easy-state";

import { stopwatch } from "./store";

const TimerDisplay: React.FunctionComponent = view(() => (
  <div className="text-3xl">
    <span className="mr-5 font-bold">Stopwatch:</span>
    <span className="font-mono">{stopwatch.seconds.toFixed(1)}</span>
  </div>
));

const TimerToggle: React.FunctionComponent = view(() => {
  useEffect(() => {
    if (stopwatch.running) {
      const timer = setInterval(() => (stopwatch.seconds += 0.1), 100);
      return () => clearInterval(timer);
    }
  }, [stopwatch.running]);

  useEffect(() => {
    if (stopwatch.seconds > 2) {
      fetch("/names.json")
        .then((res) => res.json())
        .then(({ names }) => (stopwatch.names = names));
    }
  }, [stopwatch.seconds > 2]);

  return (
    <div className="my-5">
      <button
        onClick={() => (stopwatch.running = !stopwatch.running)}
        className="bg-blue-700 text-white px-10 py-2 font-bold rounded-full text-3xl"
      >
        {stopwatch.running ? "Stop" : "Start"}
      </button>
    </div>
  );
});

const Names: React.FunctionComponent = view(() =>
  stopwatch.names ? (
    <>
      <div className="text-3xl font-bold mb-5">Data</div>
      <div className="text-3xl font-mono">
        {JSON.stringify(stopwatch.names)}
      </div>
    </>
  ) : null
);

const App: React.FunctionComponent = () => (
  <div className="mt-10 mx-auto max-w-3xl">
    <h1 className="font-bold text-5xl mb-5 border-b-2 border-gray-800">
      Bidirectional - Easy State
    </h1>
    <TimerDisplay />
    <TimerToggle />
    <Names />
  </div>
);

export default App;
