const express = require('express');
const fs = require('fs');
const { resolve } = require('path');

const configureRoutes = require('./routes/configure-routes');

module.exports = (configFiles, configLocation) => {
  const mockFoo = express();
  configFiles.forEach(fileName => {
    if (isDir(fileName, configLocation)) {
      // TODO: recursive
      return;
    }
    console.log('sending in filename');
    console.log(fileName);
    return configureRoutes({ mockFooServer: mockFoo, fileName, configLocation });
  });
  return launchApp(mockFoo);
};

function launchApp(app) {
  const DEFAULT_PORT = 2333;

  app.get('/mock-foo', (_, res) => {
    res.send(`Mock Foo is running on port: ${DEFAULT_PORT}`);
  });

  // Log out all routes created for helpful debugging
  console.log(app._router.stack.filter(r => r.route).map(r => r.route.path));

  // Finally, launch the app for reals
  app.listen(DEFAULT_PORT, () => {
    console.log(`Mock Foo running on port ${DEFAULT_PORT}`);
  });
  return app;
}

function isDir(fileName, baseDir) {
  return fs.statSync(resolve(baseDir, fileName)).isDirectory();
}
