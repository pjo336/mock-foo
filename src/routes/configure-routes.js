const { resolve } = require('path');

const configureRoute = require('./configure-route');

module.exports = function configureRoutes({ mockFooServer, fileName, configLocation }) {
  const reqEndpoint = fileName
    .split('.')
    .slice(0, -1)
    .join('.');
  const fileLocation = resolveWithBase(fileName, configLocation);

  if (!reqEndpoint) {
    throw new Error('Mock Foo: Invalid file found - ' + fileLocation);
  }

  const file = require(fileLocation);
  if (!file) {
    throw new Error('Mock Foo: File not found - ' + fileLocation.toString());
  }

  // File has an array of route definitions, map over them
  console.log('file found!');
  console.log(file);
  return file.map(endpointDesc => configureRoute({ mockFooServer, endpointDesc, reqEndpoint }));
};

function resolveWithBase(fileName, baseDir) {
  return resolve(baseDir, fileName);
}
