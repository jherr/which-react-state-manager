import { useStore, useEvent } from "effector-react";
import { $names, $running, $seconds, toggle } from "./store";

const TimerDisplay: React.FunctionComponent = () => {
  const seconds = useStore($seconds);
  return (
    <div className="text-3xl">
      <span className="mr-5 font-bold">Stopwatch:</span>
      <span className="font-mono">{seconds.toFixed(1)}</span>
    </div>
  );
};

const TimerToggle: React.FunctionComponent = () => {
  const running = useStore($running);
  const onToggle = useEvent(toggle);
  return (
    <div className="my-5">
      <button
        onClick={onToggle}
        className="bg-blue-700 text-white px-10 py-2 font-bold rounded-full text-3xl"
      >
        {running ? "Stop" : "Start"}
      </button>
    </div>
  );
};

const Names: React.FunctionComponent = () => {
  const names = useStore($names);
  return names.length ? (
    <>
      <div className="text-3xl font-bold mb-5">Data</div>
      <div className="text-3xl font-mono">{JSON.stringify(names)}</div>
    </>
  ) : null;
};

const App: React.FunctionComponent = () => (
  <div className="mt-10 mx-auto max-w-3xl">
    <h1 className="font-bold text-5xl mb-5 border-b-2 border-gray-800">
      Reactive - Effector
    </h1>
    <TimerDisplay />
    <TimerToggle />
    <Names />
  </div>
);

export default App;
