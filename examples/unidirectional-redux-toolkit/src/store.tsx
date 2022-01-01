import {
  configureStore,
  createSlice,
  PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";

const stopwatchSlice = createSlice({
  name: "stopwatch",
  initialState: {
    seconds: 0,
    running: false,
  },
  reducers: {
    increment: (state) => {
      if (state.running) {
        state.seconds += 0.1;
      }
    },
    toggle: (state) => {
      state.running = !state.running;
    },
  },
});

let namesRequest: Promise<{ names: string[] }>;
const fetchNames = createAsyncThunk("names/fetch", async () => {
  if (!namesRequest) {
    namesRequest = fetch("/names.json").then((response) => response.json());
  }
  return namesRequest;
});

export interface NamesState {
  names?: string[];
}

const namesInitialState: NamesState = {
  names: undefined,
};

const namesSlice = createSlice({
  name: "names",
  initialState: namesInitialState,
  reducers: {
    setNames: (state, action: PayloadAction<string[]>) => {
      state.names = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNames.fulfilled, (state, { payload }) => {
      state.names = payload.names;
    });
  },
});

export const store = configureStore({
  reducer: {
    stopwatch: stopwatchSlice.reducer,
    names: namesSlice.reducer,
  },
});

export const { toggle } = stopwatchSlice.actions;

type RootState = ReturnType<typeof store.getState>;

export const selectSeconds = (state: RootState) => state.stopwatch.seconds;
export const selectRunning = (state: RootState) => state.stopwatch.running;
export const selectNames = (state: RootState) => state.names.names;

const { increment } = stopwatchSlice.actions;

window.setInterval(async () => {
  store.dispatch(increment());

  const {
    stopwatch: { seconds },
    names: { names },
  } = store.getState();

  if (seconds > 2.0 && !names && !namesRequest) {
    store.dispatch(fetchNames());
  }
}, 100);
