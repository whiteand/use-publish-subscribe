import { append, iterate, remove } from "../list";
import { TList } from "../types";

function collect<Node>(list: TList<Node>): Node[] {
  const res: Node[] = [];
  iterate(list, (value) => res.push(value));
  return res;
}

describe("append", () => {
  test("append to empty", () => {
    const list = null;
    const newList = append(list, 123);
    expect(newList).toMatchInlineSnapshot(`
      Array [
        123,
        null,
      ]
    `);
  });
  test("append to not empty ", () => {
    const list = null;
    const newList = append(append(list, 123), 321);
    expect(newList).toMatchInlineSnapshot(`
      Array [
        321,
        Array [
          123,
          null,
        ],
      ]
    `);
  });
});

describe("remove", () => {
  test("remove from empty", () => {
    const list = null;
    const newList = remove(list, 123);
    expect(newList).toBe(null);
  });
  test("remove if not exists", () => {
    const list = append(null, 123);
    const newList = remove(list, 321);
    expect(newList).toBe(list);
    expect(newList).toEqual([123, null]);
  });
  test("remove if exists beginning", () => {
    const list = append(append(null, 123), 321);
    const newList = remove(list, 321);
    expect(newList).toEqual([123, null]);
    expect(newList).toBe(list && list[1]);
  });
  test("remove if exists beginning", () => {
    const list = append(append(null, 123), 321);
    const newList = remove(list, 123);
    expect(newList).toEqual([321, null]);
  });
});

describe("iterate", () => {
  test("empty", () => {
    expect(collect(null)).toEqual([]);
  });
  test("not empty", () => {
    expect(collect(append(null, 123))).toEqual([123]);
    expect(collect(append(append(null, 321), 123))).toEqual([123, 321]);
  });
});
