import { store } from "@risingstack/react-easy-state";

export const stopwatch = store<{
  seconds: number;
  running: boolean;
  names?: string[];
}>({
  seconds: 0,
  running: false,
});
