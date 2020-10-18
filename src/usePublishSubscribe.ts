import { useCallback, useRef } from "react";
import { append, remove, iterate } from "./list";
import { TList, TPublish, TSubscribe, TSubscriber } from "./types";

export function usePublishSubscribe<S>(initialValue: S) {
  const valueRef = useRef(initialValue);

  const listenersRef = useRef<TList<TSubscriber<S>>>(null);

  const subscribe: TSubscribe<S> = useCallback(
    function (subscriber, immediateCallWithCurrentValue = false) {
      listenersRef.current = append(listenersRef.current, subscriber);
      if (immediateCallWithCurrentValue) {
        subscriber(valueRef.current);
      }
      const unsubscribe = function unsubscribe() {
        listenersRef.current = remove(listenersRef.current, subscriber);
      };
      return unsubscribe;
    },
    [listenersRef, valueRef]
  );

  const publish: TPublish<S> = useCallback(
    function (value) {
      valueRef.current = value;
      iterate(listenersRef.current, function (callback) {
        callback(value);
      });
    },
    [listenersRef, valueRef]
  );

  return [publish, subscribe];
}
