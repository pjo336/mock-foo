const fs = require('fs');
const path = require('path');

// Let's get some error handling out of the way
if (process.env.NODE_ENV === 'production') {
  throw new Error('Should not use Mock Foo in production');
}

// Check for the config location env var
const CONFIG_LOCATION = process.env.MOCK_FOO_CONFIG
  ? process.env.MOCK_FOO_CONFIG
  : path.resolve(process.cwd(), '__mock_foo__');

if (!CONFIG_LOCATION) {
  throw new Error('Mock Foo CONFIG_LOCATION is not properly configured');
}

const configFiles = fs.readdirSync(CONFIG_LOCATION);

// Make sure there actually are some config files
if (!configFiles) {
  throw new Error(`No Mock Foo configuration files were found at ${CONFIG_LOCATION}`);
}

// Initial validation passed, configure the APP
console.log('Mock Foo is configuring');
require('./app')(configFiles, CONFIG_LOCATION);
