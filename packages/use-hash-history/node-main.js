/* eslint-env node */
module.exports =
  process.env.NODE_ENV === 'production'
    ? require('./umd/use-hash-history.production.min.js')
    : require('./umd/use-hash-history.development.js');
