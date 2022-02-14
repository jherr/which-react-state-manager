import { useEffect } from "react";
import {
  atom,
  useRecoilState,
  useSetRecoilState,
  useRecoilValue,
  selector,
} from "recoil";

const namesValueAtom = atom<string[] | undefined>({
  key: "namesValue",
  default: undefined,
});

export const secondsAtom = atom({ key: "seconds", default: 0 });

export const namesAtom = selector({
  key: "namesAtom",
  get: ({ get }) => (get(secondsAtom) > 2.0 ? get(namesValueAtom) : ""),
});

export const runningAtom = atom({ key: "running", default: false });

export const useStopwatch = () => {
  const [seconds, setSeconds] = useRecoilState(secondsAtom);
  const setNames = useSetRecoilState(namesValueAtom);
  const running = useRecoilValue(runningAtom);
  useEffect(() => {
    if (seconds > 2) {
      fetch("/names.json")
        .then((res) => res.json())
        .then(({ names }) => setNames(names));
    }
  }, [seconds > 2]);

  useEffect(() => {
    if (running) {
      const interval = window.setInterval(() => {
        setSeconds((seconds) => seconds + 0.1);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [running]);
};
