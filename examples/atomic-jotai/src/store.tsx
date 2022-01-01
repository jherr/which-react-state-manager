import { atom } from "jotai";

export const namesAtom = atom<string[] | undefined>(undefined);

export const secondsAtom = atom(0);

const incrementSecondsAtom = atom(
  (get) => get(secondsAtom),
  async (get, set, amount: number) => {
    set(secondsAtom, get(secondsAtom) + amount);

    if (get(secondsAtom) > 2 && !get(namesAtom)) {
      const response = await fetch("/names.json");
      set(namesAtom, (await response.json()).names);
    }
  }
);

const timerRefAtom = atom<number | undefined>(undefined);

export const runningAtom = atom(
  (get) => get(timerRefAtom) !== undefined,
  (get, set, start: boolean) => {
    if (get(timerRefAtom) !== undefined) {
      clearInterval(get(timerRefAtom));
      set(timerRefAtom, undefined);
    }

    if (start) {
      set(
        timerRefAtom,
        window.setInterval(() => {
          set(incrementSecondsAtom, 0.1);
        }, 100)
      );
    }
    return get(timerRefAtom) !== undefined;
  }
);
