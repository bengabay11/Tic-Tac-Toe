import config from '../config';

export const loadStateFromLocalStorage = () => {
    const serializedState = localStorage.getItem(
        config.statLocalStorageKeyName
    );
    if (serializedState === null) {
        return undefined;
    }
    try {
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveStateToLocalStorage = (state: any) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(config.statLocalStorageKeyName, serializedState);
    } catch (err) {
        // ignore errors
    }
};
