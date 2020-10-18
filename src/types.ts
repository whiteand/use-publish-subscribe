export type TSubscriber<S> = (newValue: S) => void;
export type TUnsubscribe = () => void;
export type TSubscribe<S> = (
  callback: TSubscriber<S>,
  immediateCallWithCurrentValue?: boolean
) => TUnsubscribe;
export type TPublish<S> = (newValue: S) => void;
export type TList<Node> = null | [Node, TList<Node>];
