import { BehaviorSubject } from "rxjs";
import { useObservableState } from "observable-hooks";

const running$ = new BehaviorSubject<boolean>(false);
const seconds$ = new BehaviorSubject<number>(0);
const names$ = new BehaviorSubject<string[] | undefined>(undefined);

let timer: number | undefined;
running$.subscribe((running) => {
  if (timer) {
    window.clearInterval(timer);
    timer = undefined;
  }
  if (running) {
    timer = window.setInterval(() => {
      seconds$.next(seconds$.value + 0.1);
    }, 100);
  }
});

seconds$.subscribe(async (seconds) => {
  if (seconds > 2 && !names$.value) {
    const resp = await fetch("/names.json").then((res) => res.json());
    names$.next(resp.names);
  }
});

export const useRunning = () => useObservableState(running$);
export const useSeconds = () => useObservableState(seconds$);
export const useNames = () => useObservableState(names$);
export const toggle = () => running$.next(!running$.value);
