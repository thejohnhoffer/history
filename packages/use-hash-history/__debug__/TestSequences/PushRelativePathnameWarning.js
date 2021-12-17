import * as assert from 'uvu/assert';
import {expect} from 'chai';

export default (history, done) => {
  let steps = [
    ({ location }) => {
      debugger;
      expect(location).to.include({
        pathname: '/'
      });

      history.push('/the/path?the=query#the-hash');
    },
    ({ action, location }) => {
      assert.is(action, 'PUSH');
      expect(location).to.include({
        pathname: '/the/path?the=query#the-hash',
        search: '',
        hash: ''
      });

      debugger
      /*
      let { spy, destroy } = spyOn(console, 'warn');

      history.push('../other/path?another=query#another-hash');

      expect(spy).not.toHaveBeenCalled();

      destroy();
      */
    },
    ({ location }) => {
      expect(location).to.include({
        pathname: '../other/path?another=query#another-hash',
        search: '',
        hash: ''
      });
    }
  ];

  execSteps(steps, history, done);
};
