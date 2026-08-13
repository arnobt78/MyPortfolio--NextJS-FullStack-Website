import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/** Client after hydration; false on the server and during the first hydrated render. */
export function useIsClient() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}
