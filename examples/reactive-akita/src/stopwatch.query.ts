import { Query } from "@datorama/akita";
import { useObservableState } from "observable-hooks";

import {
  StopwatchState,
  StopwatchStore,
  stopwatchStore,
} from "./stopwatch.store";

export class StopwatchQuery extends Query<StopwatchState> {
  allState$ = this.select();
  running$ = this.select((state) => state.running);
  names$ = this.select((state) => state.names);
  seconds$ = this.select((state) => state.seconds);

  constructor(protected store: StopwatchStore) {
    super(store);
  }
}

export const stopwatchQuery = new StopwatchQuery(stopwatchStore);

export const useSeconds = () => useObservableState(stopwatchQuery.seconds$, 0);
export const useRunning = () =>
  useObservableState(stopwatchQuery.running$, false);
export const useNames = () => useObservableState(stopwatchQuery.names$);
