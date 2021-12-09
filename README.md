# History Noslash

This package exists as a stopgap until [Issue #8459](https://github.com/remix-run/react-router/issues/8459) is resolved.

## Deploy

For now, I'm manually running:

```
npm install
npm run build
node scripts/version.js v5.2.0-noslash.2.x
node scripts/publish
npm dist-tag add history@5.2.0-noslash.2.x latest
npm dist-tag add history@5.2.0-noslash.2.x latest
```

This is a fork of [react-router](https://github.com/remix-run/react-router).
