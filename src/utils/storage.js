import { defaultAppState, hydrateData } from "../data/defaultAppState.js"; 

const KEY_STORAGE = "viteTodoAppState";

export function saveState(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(KEY_STORAGE, serializedState);
  } catch (err) {
    console.error("Error saving state", err);
  }
}

export function loadState() {
  const serializedState = localStorage.getItem(KEY_STORAGE);

  if (serializedState === null) {
    console.log("Local Storage empty. Used initial state");
    return defaultAppState;
  }

  try {
    const rawData = JSON.parse(serializedState); 
    return hydrateData(rawData);
  } catch (err) {
    console.error("Error loading data:", err);
    return defaultAppState;
  }
}
