import { useLayoutEffect, useState } from "react";
import { TSubscribe } from "./types";

export function usePublishedState<S>(
  subscribe: TSubscribe<S>,
  initialValue: S
): S {
  const [state, setState] = useState<S>(initialValue);

  useLayoutEffect(
    function() {
      return subscribe(setState, true);
    },
    [subscribe, setState]
  );

  return state;
}
