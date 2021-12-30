import { useEffect } from "react";
import {
  atom,
  useRecoilState,
  useSetRecoilState,
  useRecoilValue,
} from "recoil";

export const namesAtom = atom<string[] | undefined>({
  key: "names",
  default: undefined,
});

export const secondsAtom = atom({ key: "seconds", default: 0 });

export const runningAtom = atom({ key: "running", default: false });

export const useStopwatch = () => {
  const [seconds, setSeconds] = useRecoilState(secondsAtom);
  const setNames = useSetRecoilState(namesAtom);
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
