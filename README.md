# use-publish-subscribe

[![Build Status](https://travis-ci.com/whiteand/use-publish-subscribe.svg?branch=master)](https://travis-ci.com/whiteand/use-publish-subscribe)
[![Coverage Status](https://coveralls.io/repos/github/whiteand/use-publish-subscribe/badge.svg?branch=master)](https://coveralls.io/github/whiteand/use-publish-subscribe?branch=master)

**Size: 3.46 KB** (minified and gzipped). Only React dependency. [Size Limit](https://github.com/ai/size-limit) controls the size.

# Where can I use it?

The main case is when you need to share some data between 2+ child components, but without rerendering of the parent component.

For example:

```javascript
import { usePublishSubscribe } from 'use-publish-subscribe'
import { Renderer } from './Renderer.js'
import { Counter } from './Counter.js'

function Parent() {
  const [publish, subscribe] = usePublishSubscribe(0)
  return (
    <>
      <Counter onChange={publish}>
      <Renderer subscribe={subscribe}>
    </>
  )
}
```
```javascript
// Counter.js
function Counter({ onChange }) {
  const counter = useRef(0)

  const increase = useCallback(() => {
    counter.current += 1;
    onChange(counter.current)
  }, [counter, publish])

  return <button onClick={increase}>Increase</button>
}
```

```javascript
// Renderer.js
function Renderer({ subscribe }) {
  const [counter, setCounter] = useState(0)

  useEffect(() => subscribe(setCounter, true), [setCounter, subscribe])

  return <div>Counter: {counter}</div>
}
```
