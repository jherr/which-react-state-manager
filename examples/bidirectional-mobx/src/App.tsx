import { observer } from "mobx-react-lite";

import store from "./store";

const TimerDisplay: React.FunctionComponent = observer(() => (
  <div className="text-3xl">
    <span className="mr-5 font-bold">Stopwatch:</span>
    <span className="font-mono">{store.seconds.toFixed(1)}</span>
  </div>
));

const TimerToggle: React.FunctionComponent = observer(() => (
  <div className="my-5">
    <button
      onClick={() => store.onToggle()}
      className="bg-blue-700 text-white px-10 py-2 font-bold rounded-full text-3xl"
    >
      {store.running ? "Stop" : "Start"}
    </button>
  </div>
));

const Names: React.FunctionComponent = observer(() =>
  store.names ? (
    <>
      <div className="text-3xl font-bold mb-5">Data</div>
      <div className="text-3xl font-mono">{JSON.stringify(store.names)}</div>
    </>
  ) : null
);

const App: React.FunctionComponent = () => (
  <div className="mt-10 mx-auto max-w-3xl">
    <h1 className="font-bold text-5xl mb-5 border-b-2 border-gray-800">
      Bidirectional - MobX
    </h1>
    <TimerDisplay />
    <TimerToggle />
    <Names />
  </div>
);

export default App;
