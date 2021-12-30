import { stopwatchQuery } from "./stopwatch.query";
import { StopwatchStore, stopwatchStore } from "./stopwatch.store";
import { Subscription } from "rxjs";

export class StopwatchService {
  private timer: number | undefined = undefined;
  private requestedNames: boolean = false;
  private secondsSubscription: Subscription | undefined;

  constructor(private stopwatchStore: StopwatchStore) {
    this.secondsSubscription = stopwatchQuery.seconds$.subscribe((seconds) => {
      if (seconds > 2 && !this.requestedNames) {
        this.requestNames();
        this.secondsSubscription?.unsubscribe();
        this.secondsSubscription = undefined;
      }
    });
  }

  destroy() {
    this.secondsSubscription?.unsubscribe();
  }

  private async requestNames() {
    this.requestedNames = true;
    const { names } = await fetch("/names.json").then((res) => res.json());
    this.stopwatchStore.update({
      names,
    });
  }

  update({ running, names }: { running: boolean; names?: string[] }) {
    if (names) {
      this.stopwatchStore.update({ names });
    }

    if (this.timer) {
      window.clearInterval(this.timer);
      this.timer = undefined;
    }

    this.stopwatchStore.update({ running });

    if (this.stopwatchStore.getValue().running) {
      this.timer = window.setInterval(() => {
        this.stopwatchStore.update({
          seconds: this.stopwatchStore.getValue().seconds + 0.1,
        });
      }, 100);
    }
  }
}

export const stopwatchService = new StopwatchService(stopwatchStore);
