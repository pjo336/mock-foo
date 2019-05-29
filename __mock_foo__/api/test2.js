const sinon = require('sinon');

module.exports = {
  req: {
    body: () => sinon.match({ test: 123 }),
  },
  res: {
    success: true,
    data: {
      thisIs: 'test2',
    },
  },
};
