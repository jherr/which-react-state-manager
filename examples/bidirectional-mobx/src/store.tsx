import { makeAutoObservable, observable } from "mobx";

class ApplicationStore {
  seconds = 0;
  running = false;
  names?: string[] = undefined;
  protected timer?: number = undefined;

  constructor() {
    makeAutoObservable(
      this,
      {
        seconds: observable,
        running: observable,
        names: observable,
      },
      { autoBind: true }
    );
  }

  onToggle() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.running = !this.running;
    if (this.running) {
      this.timer = setInterval(() => this.increment(), 100);
    }
  }

  increment() {
    this.seconds += 0.1;
    if (this.seconds > 2) {
      fetch("/names.json")
        .then((res) => res.json())
        .then(({ names }) => this.setNames(names));
    }
  }

  setNames(names: string[]) {
    this.names = names;
  }
}

const store = new ApplicationStore();

export default store;
