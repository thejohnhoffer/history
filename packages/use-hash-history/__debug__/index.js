import { suite } from "uvu";
import * as assert from 'uvu/assert';
import * as ENV from "./setup/env.js";
import { useHashHistory } from "../index.ts";

const TestUseHistory = suite("test history hook");

TestUseHistory.before.each(ENV.reset);

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

TestUseHistory("Runs", async () => {
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

  assert.is(pathname, '../other/path?another=query#another-hash')
});

TestUseHistory.run();
