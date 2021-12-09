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

d.tests.set("Start with ?", async () => {
  const history = useHashHistory({hashRoot:"/"})

  await testLocationPathname({
    fn: history.push,
    listen: history.listen,
    input: '/home?the=query#the-hash'
  })

  const pathname = await testLocationPathname({
    fn: history.push,
    listen: history.listen,
    input: '?another=query#another-hash'
  })

  debugger
  assert.equal(pathname, '/?another=query#another-hash')
});

d.run();
