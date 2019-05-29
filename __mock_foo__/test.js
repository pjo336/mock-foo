const { matchAny, matchObj } = require('../src/matchers');

module.exports = [
  {
    req: {
      method: 'GET',
      params: matchAny,
      body: matchObj({ test: 123 }),
    },
    res: {
      success: true,
      data: {
        you: 'did it!',
      },
    },
  },
];
