/**
 * Using the method type of the endpoint, dynamically generate a route
 * to match the req information given.
 */
module.exports = function configureRoute({ mockFooServer, endpointDesc, reqEndpoint }) {
  mockFooServer[endpointDesc.req.method.toLowerCase()](`/${reqEndpoint}`, (req, res) => {
    console.log(endpointDesc);
    console.log(endpointDesc.req.params);
    if (endpointDesc.req.params.test(req.query)) res.json(endpointDesc.res);
    else res.status(404).send('Mock Foo resource not found');
  });
};
