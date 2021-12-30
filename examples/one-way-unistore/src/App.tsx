import React from "react";
import { Provider, connect } from "unistore/react";

import { store, asyncFunctions } from "./store";

interface TimerDisplayProps {
  seconds?: number;
}
const TimerDisplay = connect<TimerDisplayProps, unknown, unknown, unknown>([
  "seconds",
])(({ seconds }: TimerDisplayProps) => (
  <div className="text-3xl">
    <span className="mr-5 font-bold">Stopwatch:</span>
    <span className="font-mono">{seconds?.toFixed(1)}</span>
  </div>
));

interface TimerToggleProps {
  running?: boolean;
  toggle?: () => {};
}

const TimerToggle = connect<TimerToggleProps, unknown, unknown, unknown>(
  ["running"],
  asyncFunctions
)(({ running, toggle }: TimerToggleProps) => (
  <div className="my-5">
    <button
      onClick={toggle}
      className="bg-blue-700 text-white px-10 py-2 font-bold rounded-full text-3xl"
    >
      {running ? "Stop" : "Start"}
    </button>
  </div>
));

interface NamesProps {
  names?: string[];
}

const Names = connect<NamesProps, unknown, unknown, unknown>(["names"])(
  ({ names }: NamesProps) =>
    names ? (
      <>
        <div className="text-3xl font-bold mb-5">Data</div>
        <div className="text-3xl font-mono">{JSON.stringify(names)}</div>
      </>
    ) : null
);

const App: React.FunctionComponent = () => (
  <Provider store={store}>
    <div className="mt-10 mx-auto max-w-3xl">
      <h1 className="font-bold text-5xl mb-5 border-b-2 border-gray-800">
        One Way - Unistore
      </h1>
      <TimerDisplay />
      <TimerToggle />
      <Names />
    </div>
  </Provider>
);

export default App;
