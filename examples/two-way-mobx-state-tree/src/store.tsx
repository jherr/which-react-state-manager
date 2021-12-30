import { types, cast } from "mobx-state-tree";

const Names = types
  .model({
    names: types.array(types.string),
  })
  .actions((self) => ({
    setNames(names: string[]) {
      self.names = cast(names);
    },
  }))
  .actions((self) => ({
    async getNames() {
      if (self.names.length === 0) {
        const resp = await fetch("/names.json").then((resp) => resp.json());
        self.setNames(resp.names);
      }
    },
  }));

export const names = Names.create({
  names: [],
});

let timer: number | undefined = undefined;

const StopWatch = types
  .model({
    running: types.boolean,
    seconds: types.number,
  })
  .actions((self) => ({
    increment() {
      self.seconds += 0.1;
    },
  }))
  .actions((self) => ({
    toggle() {
      self.running = !self.running;
      if (timer) {
        window.clearInterval(timer);
        timer = undefined;
      }
      if (self.running) {
        timer = window.setInterval(() => {
          self.increment();
          if (self.seconds > 2) {
            names.getNames();
          }
        }, 100);
      }
    },
  }));

export const stopWatch = StopWatch.create({
  running: false,
  seconds: 0,
});
