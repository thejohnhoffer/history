For this fork, here is the [published branch](https://github.com/thejohnhoffer/history/tree/publish-noslash#history-noslash). That branch is a response to [history issue 912](https://github.com/remix-run/history/issues/912), and here's [a template for its use](https://github.com/thejohnhoffer/test-history-router#history-router-test-template). It can be installed as `history-noslash` from `npm` and `yarn` [here](https://yarnpkg.com/package/history-noslash#readme).

# history &middot; [![npm package][npm-badge]][npm] [![Travis][build-badge]][build]

[npm-badge]: https://img.shields.io/npm/v/history.svg?style=flat-square
[npm]: https://www.npmjs.org/package/history
[build-badge]: https://img.shields.io/travis/ReactTraining/history/master.svg?style=flat-square
[build]: https://travis-ci.org/ReactTraining/history

The history library lets you easily manage session history anywhere JavaScript runs. A `history` object abstracts away the differences in various environments and provides a minimal API that lets you manage the history stack, navigate, and persist state between sessions.

## Documentation

Documentation for version 5 can be found in the [docs](docs) directory. This is the current stable release. Version 5 is used in React Router version 6.

Documentation for version 4 can be found [on the v4 branch](https://github.com/ReactTraining/history/tree/v4/docs). Version 4 is used in React Router versions 4 and 5.

## Changes

To see the changes that were made in a given release, please lookup the tag on [the releases page](https://github.com/ReactTraining/history/releases).

For changes released in version 4.6.3 and earlier, please see [the `CHANGES.md` file](https://github.com/ReactTraining/history/blob/845d690c5576c7f55ecbe14babe0092e8e5bc2bb/CHANGES.md).

## Development

Development of the current stable release, version 5, happens on [the `master` branch](https://github.com/ReactTraining/history/tree/master). Please keep in mind that this branch may include some work that has not yet been published as part of an official release. However, since `master` is always stable, you should feel free to build your own working release straight from master at any time.

If you're interested in helping out, please read [our contributing guidelines](CONTRIBUTING.md).

## About

`history` is developed and maintained by [Remix](https://remix.run). If you're interested in learning more about what React can do for your company, please [get in touch](mailto:hello@remix.run)!

## Thanks

A big thank-you to [BrowserStack](https://www.browserstack.com/) for providing the infrastructure that allows us to run our build in real browsers.

Also, thanks to [Dan Shaw](https://www.npmjs.com/~dshaw) for letting us use the `history` npm package name. Thanks, Dan!
