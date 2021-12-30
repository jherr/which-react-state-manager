import { Store, StoreConfig } from "@datorama/akita";

export interface StopwatchState {
  seconds: number;
  running: boolean;
  names?: string[];
}

export function createInitialState(): StopwatchState {
  return {
    seconds: 0,
    running: false,
  };
}

@StoreConfig({ name: "stopwatch" })
export class StopwatchStore extends Store<StopwatchState> {
  constructor() {
    super(createInitialState());
  }
}

export const stopwatchStore = new StopwatchStore();
