import expect from 'expect';

import { execSteps, spyOn } from './utils.js';

export default (history, done) => {
  let steps = [
    ({ location }) => {
      expect(location).toMatchObject({
        pathname: '/'
      });

      history.push('/the/path?the=query#the-hash');
    },
    ({ action, location }) => {
      expect(action).toBe('PUSH');
      expect(location).toMatchObject({
        pathname: '/the/path?the=query#the-hash',
        search: '',
        hash: ''
      });

      let { spy, destroy } = spyOn(console, 'warn');

      history.push('../other/path?another=query#another-hash');

      expect(spy).not.toHaveBeenCalledWith(
        expect.stringContaining('relative pathnames are not supported')
      );

      destroy();
    },
    ({ location }) => {
      expect(location).toMatchObject({
        pathname: '../other/path?another=query#another-hash',
        search: '',
        hash: ''
      });
    }
  ];

  execSteps(steps, history, done);
};
