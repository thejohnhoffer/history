# [History Noslash](https://yarnpkg.com/package/history-noslash)

This package exists as a stopgap until [Issue #912](https://github.com/remix-run/history/issues/912) is resolved.

Here is a [live demo on CodeSandbox](https://codesandbox.io/s/hash-router-history-noslash-sxud8?file=/src/index.js),
and here is a [minimal template](https://github.com/thejohnhoffer/test-history-router) of the below example.

## Installation and Example

To install along with `react-router-dom@6.1.1`: 

```
yarn add history-noslash@latest react-router-dom@6.1.1
```

It can be used with `react-router-dom@6.1.1` as follows: 

```jsx
import { createHashHistory } from "history-noslash"; // Use of this package
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import * as React from "react";

const history = createHashHistory({
  window, hashRoot: ""
})

const App = () => {
  return (
    <HistoryRouter basename="" history={history}>
      <Link to="home">Go to #home</Link>
      <Routes>
        <Route path="home" element={<>content</>} />;
      </Routes>
    </HistoryRouter>
  );
}
```

## Contributing

This lives on [a branch of a fork](https://github.com/thejohnhoffer/history/tree/publish-noslash) of `history@5.1.0`.
That fork is the npm-ready version of [History PR # 911](https://github.com/remix-run/history/pull/911).

Optimistically, this package is versioned as a pre-release of `history@5.2.0`.
