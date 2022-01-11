import {createState, globalBind} from '@agile-ts/core';

export const NAMES = createState<string[] | null>(null);
export const SECONDS = createState(0);
export const IS_RUNNING = createState(false);

export const incrementSeconds = async (amount = 0.1) => {
    const seconds = SECONDS.value;
    const todos = NAMES.value;

    // Increment Seconds
    SECONDS.set((v) => v + amount);

    // Fetch dummy Data
    if (seconds > 2 && todos == null) {
        const response = await fetch('/names.json');
        const parsedJson = await response.json();
        NAMES.set(parsedJson.names);
    }
};

export const { toggleTimer } = (() => {
    let timerRef: null | number = null;

    const toggleTimer = () => {
        const isRunning = !IS_RUNNING.value;
        IS_RUNNING.set(isRunning);

        // Clear Interval
        if (timerRef != null) {
            clearInterval(timerRef);
            timerRef = null;
        }

        // Start Interval
        if (isRunning) timerRef = setInterval(incrementSeconds, 100);
    };
    return { toggleTimer };
})();

// For better debugging in Browser console
globalBind('__store__', {NAMES, SECONDS, IS_RUNNING});
