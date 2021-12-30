import createStore, { type Store } from "unistore";

interface StoreState {
  seconds: number;
  running: boolean;
  names?: string[];
}

export const store = createStore<StoreState>({ seconds: 0, running: false });

export const asyncFunctions = (store: Store<StoreState>) => {
  let timer: number | undefined = undefined;
  let namesRequested = false;

  return {
    toggle() {
      if (store.getState().running) {
        store.setState({ running: false });
        clearInterval(timer);
        timer = undefined;
      } else {
        store.setState({ running: true });
        timer = setInterval(() => {
          store.setState({ seconds: store.getState().seconds + 0.1 });
          if(store.getState().seconds > 2 && !namesRequested) {
            namesRequested = true;
            fetch('names.json')
              .then(res => res.json())
              .then(({ names }) => store.setState({ names }));
          }
        }, 100);  
      }
    }
  }
}