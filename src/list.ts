import { TList } from "./types";

export function append<Node>(list: TList<Node>, value: Node): TList<Node> {
  if (!list) {
    return [value, null];
  }
  return [value, list];
}

export function remove<Node>(list: TList<Node>, value: Node): TList<Node> {
  if (!list) return null;
  if (list[0] === value) return list[1];
  let currentList = list;
  while (currentList[1] && currentList[1][0] !== value)
    currentList = currentList[1];

  if (!currentList[1]) return list;

  currentList[1] = currentList[1][1];

  return list;
}

export function iterate<Node>(
  list: TList<Node>,
  callback: (node: Node) => void
): void {
  while (list) {
    callback(list[0]);
    list = list[1];
  }
}
