import expect from 'expect';
import { useHashHistory } from 'use-hash-history';

describe('a hash history on a page with a <base> tag', () => {
  let history, base;
  beforeEach(() => {
    if (window.location.hash !== '#/') {
      window.location.hash = '/';
    }

    base = document.createElement('base');
    base.setAttribute('href', '/prefix');

    document.head.appendChild(base);
    history = useHashHistory({hashRoot : "/"});
  });

  afterEach(() => {
    document.head.removeChild(base);
  });

  it('knows how to create hrefs', () => {
    const hashIndex = window.location.href.indexOf('#');
    const upToHash =
      hashIndex === -1
        ? window.location.href
        : window.location.href.slice(0, hashIndex);

    const href = history.createHref({
      pathname: '/the/path?the=query#the-hash',
      search: '',
      hash: ''
    });

    expect(href).toEqual(upToHash + '#/the/path?the=query#the-hash');
  });
});
