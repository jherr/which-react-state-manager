import { proxy } from "valtio";

interface ApplicationState {
  seconds: number;
  running: boolean;
  names?: string[];
}

export const store = proxy<ApplicationState>({
  seconds: 0,
  running: false,
  names: undefined,
});

export const onToggle = () => (store.running = !store.running);

setInterval(() => {
  if (store.running) {
    store.seconds += 0.1;
    if (store.seconds > 2 && !store.names) {
      fetch("/names.json")
        .then((res) => res.json())
        .then(({ names }) => (store.names = names));
    }
  }
}, 100);
