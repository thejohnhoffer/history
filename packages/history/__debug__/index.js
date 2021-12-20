import * as ENV from "./setup/env.js";
import { strict as assert } from 'assert';
import * as history from "../index.ts";
const { createHashHistory, createPath } = history;

const d = new ENV.Debugger(ENV);

/*
 * Roundtrip test of pathname update
 */
const testLocationPathname = async ({ fn, listen, input }) => {
  return new Promise((resolve) => {
    listen(({ location }) => {
      resolve(location.pathname);
    });
    fn(input);
  });
};

d.tests.set("Debug hashRoot:''", async () => {
  const hashRoot = "";
  const history = createHashHistory({ hashRoot });

  await testLocationPathname({
    fn: history.replace,
    listen: history.listen,
    input: '/the/path?the=query#the-hash'
  })

  const pathname = await testLocationPathname({
    fn: history.push,
    listen: history.listen,
    input: '../other/path?another=query#another-hash'
  })

  assert.equal(pathname, '../other/path')

  debugger
  // Test window location
  const historyHref = createPath(history.location);
  const windowHref = document.defaultView.location.hash.substr(1);
  assert.equal(historyHref.replace(/^\//, hashRoot), windowHref);
});

d.run();
