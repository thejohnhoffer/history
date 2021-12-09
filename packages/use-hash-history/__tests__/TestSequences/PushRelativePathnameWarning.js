import expect from 'expect';

import { execSteps, spyOn } from './utils.js';

export default (history, done) => {
  let steps = [
    ({ location }) => {
      console.warn({warn: 1, ...location})
      expect(location).toMatchObject({
        pathname: '/'
      });

      history.push('/the/path?the=query#the-hash');
    },
    ({ action, location }) => {
      console.warn({warn: 2, ...location})
      expect(action).toBe('PUSH');
      expect(location).toMatchObject({
        pathname: '/the/path?the=query#the-hash',
        search: '',
        hash: ''
      });

      let { spy, destroy } = spyOn(console, 'warn');

      history.push('../other/path?another=query#another-hash');

      expect(spy).not.toHaveBeenCalled();

      destroy();
    },
    ({ location }) => {
      console.warn({warn: 3, ...location})
      expect(location).toMatchObject({
        pathname: '../other/path?another=query#another-hash',
        search: '',
        hash: ''
      });
    }
  ];

  execSteps(steps, history, done);
};
