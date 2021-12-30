import {
  createStore,
  createApi,
  createEffect,
  createEvent,
  guard,
} from "effector";

export const toggle = createEvent();

export const $seconds = createStore(0);

export const $running = createStore(false);

const getNamesFx = createEffect(async () => {
  const req = await fetch("/names.json");
  return (await req.json()).names;
});

export const $names = createStore<string[]>([]).on(
  getNamesFx.doneData,
  (_, names) => names
);

$running.on(toggle, (state) => !state);

guard({ source: $seconds, filter: (state) => state > 2, target: getNamesFx });

const { increment } = createApi($seconds, {
  increment: (state) => state + 0.1,
});

let timer: number | undefined = undefined;
$running.watch((running) => {
  if (timer) {
    clearInterval(timer);
  }
  if (running) {
    timer = window.setInterval(() => increment(), 100);
  }
});
