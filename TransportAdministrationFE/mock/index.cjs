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

server.get('/api/trucks', (req, res) => {
  res.send(lowdb.get('getTrucks'));
});

server.get('/api/trucks/:id', (req, res) => {
  res.send(lowdb.get('getTruckItem'));
});

server.put('/api/trucks/new', (req, res) => {
  res.send();
});

server.put('/api/trucks/:id', (req, res) => {
  res.send();
});

server.delete('/api/trucks/:id', (req, res) => {
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
server.delete('/api/sites/:id', (req, res) => {
  res.send();
});

server.get('/api/stores', (req, res) => {
  res.send(lowdb.get('getStores'));
});

server.get('/api/stores/:id', (req, res) => {
  res.send(lowdb.get('getStoreItem'));
});

server.put('/api/stores/new', (req, res) => {
  res.send();
});

server.put('/api/stores/:id', (req, res) => {
  res.send();
});
server.delete('/api/stores/:id', (req, res) => {
  res.send();
});

server.use(router);
server.listen(port, () => {
  console.log('JSON Mock Server is running on port: ', port);
});
