import { useCallback, useRef } from "react";
import { TPublish, TSubscribe, TSubscriber } from "./types";

export function usePublishSubscribe<S>(
  initialValue: S
): [TPublish<S>, TSubscribe<S>] {
  const valueRef = useRef(initialValue);

  const listenersRef = useRef<Array<TSubscriber<S>>>([]);

  const subscribe: TSubscribe<S> = useCallback(
    function(
      subscriber: (value: S) => void,
      immediateCallWithCurrentValue = false
    ) {
      listenersRef.current.push(subscriber);
      if (immediateCallWithCurrentValue) {
        subscriber(valueRef.current);
      }
      const unsubscribe = function unsubscribe() {
        const ind = listenersRef.current.indexOf(subscriber);
        if (ind >= 0) {
          listenersRef.current.splice(ind, 1);
        }
      };
      return unsubscribe;
    },
    [listenersRef, valueRef]
  );

  const publish: TPublish<S> = useCallback(
    function(value: S) {
      valueRef.current = value;
      const listeners = listenersRef.current;
      for (let i = 0; i < listeners.length; i++) {
        const listener = listeners[i];
        listener(value);
      }
    },
    [listenersRef, valueRef]
  );

  return [publish, subscribe];
}
