import { usePublishSubscribe } from "../usePublishSubscribe";
import { usePublishedState } from "../helpers";

jest.mock("react", () => ({
  useState: (init: any) => [init, () => {}],
  useEffect: (eff: any) => eff(),
  useLayoutEffect: (eff: any) => eff(),
  useRef: (init: any) => ({ current: init }),
  useCallback: (cb: any) => cb,
}));
describe("usePublishState", () => {
  it("works", () => {
    const state = usePublishedState(() => () => {}, 12);
    expect(state).toBe(12)
  });
});
