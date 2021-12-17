import expect from 'expect';

import { execSteps } from './utils.js';

export default (history, done) => {
  let steps = [
    ({ location }) => {
      expect(location).toMatchObject({
        pathname: '/'
      });

      history.push('/home?the=query#the-hash');
    },
    ({ action, location }) => {
      expect(action).toBe('PUSH');
      expect(location).toMatchObject({
        pathname: 'home?the=query#the-hash',
        search: '',
        hash: ''
      });

      history.push('?another=query#another-hash');
    },
    ({ action, location }) => {
      expect(action).toBe('PUSH');
      expect(location).toMatchObject({
        pathname: 'home?another=query#another-hash',
        search: '',
        hash: ''
      });
    }
  ];

  execSteps(steps, history, done);
};
