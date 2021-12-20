import * as ENV from "./setup/env.js";
import { strict as assert } from 'assert';
import { useHashHistory } from "../index.ts";

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

d.tests.set("Runs", async () => {
  debugger
  const history = useHashHistory({hashRoot:"/"})

  await testLocationPathname({
    fn: history.push,
    listen: history.listen,
    input: '/the/path?the=query#the-hash'
  })

  await testLocationPathname({
    fn: history.push,
    listen: history.listen,
    input: '../other/path?another=query#another-hash'
  })

  const pathname = await testLocationPathname({
    fn: history.push,
    listen: history.listen,
    input: '../other/path?another=query#another-hash'
  })

  assert.equal(pathname, '../other/path?another=query#another-hash')
});

d.run();
