import { createStoreon, StoreonModule } from "storeon";

interface StopwatchState {
  seconds: number;
  running: boolean;
}

interface StopwatchEvents {
  increment: undefined;
  toggle: undefined;
}

const stopwatchModule: StoreonModule<StopwatchState, StopwatchEvents> = (
  store
) => {
  let timer: number | undefined;

  store.on("@init", () => ({ seconds: 0, running: false }));

  store.on("increment", (state) => ({ seconds: state.seconds + 0.1 }));
  store.on("toggle", (state) => {
    if (!state.running) {
      timer = window.setInterval(() => {
        if (store.get().running) {
          store.dispatch("increment");
        }
      }, 100);
    } else {
      clearInterval(timer);
    }

    return { running: !state.running };
  });
};

interface NamesState {
  names: string[] | undefined;
}

interface NamesEvents {
  setNames: string[];
}

const namesModule: StoreonModule<NamesState, NamesEvents> = (store) => {
  store.on("@init", () => ({}));
  store.on("setNames", (_, names) => ({ names }));
};

export const store = createStoreon<
  StopwatchState & NamesState,
  StopwatchEvents & NamesEvents
>([stopwatchModule, namesModule]);

store.on("@changed", async (state) => {
  if (state.seconds > 2 && !state.names) {
    const data = await fetch("/names.json").then((res) => res.json());
    store.dispatch("setNames", data.names);
  }
});
