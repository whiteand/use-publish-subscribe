import { useEffect, useLayoutEffect, useState } from "react";
import { TSubscribe } from "./types";

/**
 * useIsomorphicEffect
 * Resolves to useEffect when "window" is not in scope and useLayout effect in the browser
 *
 * @param {Function} callback Callback function to be called on mount
 */
const useIsomorphicEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export function usePublishedState<S>(
  subscribe: TSubscribe<S>,
  initialValue: S
): S {
  const [state, setState] = useState<S>(initialValue);

  useIsomorphicEffect(
    function() {
      return subscribe(setState, true);
    },
    [subscribe, setState]
  );

  return state;
}
