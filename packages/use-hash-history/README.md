# HashHistory

This is a distribution of [Use Hash History][usehashhistory], tested within the context of a [remix-run/history](https://github.com/remix-run/history) workspace.

This package is a workaround to [history](https://github.com/remix-run/history) [Issue #912](https://github.com/remix-run/history/issues/912).

Here is a [minimal template](https://github.com/thejohnhoffer/test-history-router#history-router-test-template) of the below example.

## Installation 

For development, from within this branch of the monorepo, run:

```
npm run build
```

See the [standalone package][usehashhistory] for current deployment intructions.

# ...Why?

The `use-hash-history` module differs from  `history` in that it exposes "hashRoot" and "hashSlash" configurable properties.

This module should be used with the [unstable version][6_1_1] of the `HistoryRouter` API.  The "hashRoot" property replaces a feature that `react-router-dom@6` lost in the upgrade from `history@4` to `history@5`. Basically, this restores the ability to have a `hash` in the URL of `#something` instead of `#/something`. First, @tannera [noticed the issue](https://github.com/remix-run/react-router/issues/7703) in Nov 2020. In Dec 2021, I released `use-hash-history` for use in a work-related project.

Ultimately, I settled on maintaining `use-hash-history` as a `Proxy` around `history@5`. It now works with `react-router-dom@6.1.1`, but I plan to maintain this project for longterm compatibility with React Router going forward.

## Example Usage

```jsx
import * as React from "react";
import { useHashHistory } from "use-hash-history";
import { Routes, Route, Link } from "react-router-dom";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";

const Example = ({ hashRoot = "" }) => {
  const history = useHashHistory({ hashRoot });
  return (
    <HistoryRouter history={history}>
      <Link to="/home">Go to #{hashRoot}home</Link>
      <Routes>
        <Route path="home" element={<> here!</>} />;
        <Route path="*" element={<>...</>} />;
      </Routes>
    </HistoryRouter>
  );
};
```

Using the above `Example`, you can actually resurrect the lost `hashType` feature of `react-router-dom@5` (and `history@4`) with the following `HashTypeExample` component that handles the old `hashType` ([see old docs](https://v5.reactrouter.com/web/api/HashRouter/hashtype-string)):

```jsx
const HashTypeExample = ({ hashType }) => {
  const hashRoot = {
    slash: "/",
    noslash: "",
    hashbang: "!/",
  }[hashType];

  return <Example hashRoot={hashRoot}>
}
```

## Contributing

This module currently lives at [use-hash-history](https://github.com/thejohnhoffer/use-hash-history/). Make any pull requests against the main branch.

[6_1_1]: https://github.com/remix-run/react-router/releases/tag/v6.1.1
[usehashhistory]: https://www.npmjs.com/package/use-hash-history
