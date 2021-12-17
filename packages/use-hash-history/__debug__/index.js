import { suite } from "uvu";
import * as chai from 'chai';
import * as ENV from "./setup/env.js";
import { useHashHistory } from "../index.ts";

import PushRelativePathnameWarning from './TestSequences/PushRelativePathnameWarning.js';

const TestUseHistory = suite("test history hook");

TestUseHistory.before.each(ENV.reset);

TestUseHistory("Runs", async () => {
  debugger
	const history = useHashHistory({hashRoot:"/"})
  chai.expect(() => {
    PushRelativePathnameWarning(history, (e) => {
      if (e) {
        throw(e)
      }
    })
  }).to.not.throw()
});

TestUseHistory.run();
