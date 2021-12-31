import create from "zustand";

interface ApplicationState {
  seconds: number;
  running: boolean;
  names?: string[];
  onToggle: () => void;
  onIncrement: () => void;
}

let namesRequest: Promise<{ names: string[] }>;

export const useApplicationState = create<ApplicationState>((set, get) => ({
  seconds: 0,
  running: false,
  names: undefined,
  onToggle: () => {
    set((state) => ({
      running: !state.running,
    }));
  },
  onIncrement: async () => {
    if (get().running) {
      set((state) => ({
        seconds: state.seconds + 0.1,
      }));
    }
    if (get().seconds > 2.0 && !get().names) {
      namesRequest ||= fetch("/names.json").then((res) => res.json());
      set({ names: (await namesRequest).names });
    }
  },
}));

window.setInterval(() => useApplicationState.getState().onIncrement(), 100);
