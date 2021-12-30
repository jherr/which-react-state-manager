import { createModel, Models, init, RematchRootState } from "@rematch/core";
import { useSelector } from "react-redux";

type StopwatchState = {
  seconds: number;
  running: boolean;
  names: string[];
};

interface RootModel extends Models<RootModel> {
  stopwatch: typeof stopwatch;
}

let timer: number | undefined = undefined;

const stopwatch = createModel<RootModel>()({
  state: {
    seconds: 0,
    running: false,
  } as StopwatchState,
  reducers: {
    increment(state) {
      return { ...state, seconds: state.seconds + 0.1 };
    },
    setRunning(state, running: boolean) {
      return { ...state, running };
    },
    setNames(state, names: string[]) {
      return { ...state, names };
    },
  },
  effects: (dispatch) => ({
    async toggle(_, state) {
      if (timer) {
        window.clearInterval(timer);
        timer = undefined;
      }

      if (state.stopwatch.running) {
        dispatch.stopwatch.setRunning(false);
      } else {
        dispatch.stopwatch.setRunning(true);
        timer = window.setInterval(() => {
          dispatch.stopwatch.increment();

          dispatch.stopwatch.getNames(undefined);
        }, 100);
      }
    },
    async getNames(_, state) {
      if (state.stopwatch.seconds > 2 && !state.stopwatch.names) {
        fetch("/names.json")
          .then((res) => res.json())
          .then(({ names }) => dispatch.stopwatch.setNames(names));
      }
    },
  }),
});

const models: RootModel = { stopwatch };

export const store = init({
  models,
});

export const useToggle = () => store.dispatch.stopwatch.toggle;

type RootState = RematchRootState<RootModel>;

export const useNames = () =>
  useSelector((state: RootState) => state.stopwatch.names);
export const useSeconds = () =>
  useSelector((state: RootState) => state.stopwatch.seconds);
export const useRunning = () =>
  useSelector((state: RootState) => state.stopwatch.running);
