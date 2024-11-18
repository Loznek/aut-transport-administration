const path = require('path');
const jsonServer = require('json-server');
const pause = require('connect-pause');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'mock-db.json'));
const middlewares = jsonServer.defaults();
const port = 5000;

server.use(middlewares);
server.use(pause(1000));
server.use(jsonServer.bodyParser);

const lowdb = router.db;

server.get('/api/vehicles', (req, res) => {
  res.send();
});

server.get('/api/sites', (req, res) => {
  res.send(lowdb.get('getSites'));
});

server.get('/api/sites/:id', (req, res) => {
  res.send(lowdb.get('getSiteItem'));
});

server.put('/api/sites/new', (req, res) => {
  res.send();
});

server.put('/api/sites/:id', (req, res) => {
  res.send();
});

server.use(router);
server.listen(port, () => {
  console.log('JSON Mock Server is running on port: ', port);
});
