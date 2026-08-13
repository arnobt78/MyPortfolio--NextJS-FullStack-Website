import { useCallback, useSyncExternalStore } from "react";

const listeners = new Map<string, Set<() => void>>();

function subscribeKey(key: string, onStoreChange: () => void) {
  let set = listeners.get(key);
  if (!set) {
    set = new Set();
    listeners.set(key, set);
  }
  set.add(onStoreChange);
  const onStorage = (event: StorageEvent) => {
    if (event.key === key || event.key === null) onStoreChange();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    set.delete(onStoreChange);
    window.removeEventListener("storage", onStorage);
  };
}

function notify(key: string) {
  listeners.get(key)?.forEach((fn) => fn());
}

export function useSyncedStorage<T extends string>(
  key: string,
  fallback: T,
  allowed: readonly T[],
): [T, (next: T) => void] {
  const value = useSyncExternalStore(
    (onStoreChange) => subscribeKey(key, onStoreChange),
    () => {
      try {
        const stored = localStorage.getItem(key);
        return stored && allowed.includes(stored as T)
          ? (stored as T)
          : fallback;
      } catch {
        return fallback;
      }
    },
    () => fallback,
  );

  const setValue = useCallback(
    (next: T) => {
      localStorage.setItem(key, next);
      notify(key);
    },
    [key],
  );

  return [value, setValue];
}
