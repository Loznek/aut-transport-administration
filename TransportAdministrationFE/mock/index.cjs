const path = require('path');
const jsonServer = require('json-server');
const pause = require('connect-pause');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'mock-db.json'));
const middlewares = jsonServer.defaults();
const port = 5000;

server.use(middlewares);
//server.use(pause(1000));
server.use(jsonServer.bodyParser);

const lowdb = router.db;

server.post('/api/login', (req, res) => {
  if (req.body.username === 'driver') {
    return res.send(lowdb.get('auth-driver'));
  }

  res.send(lowdb.get('auth-admin'));
});

server.get('/api/me', (req, res) => {
  const token = req.headers['authorization'];
  if (token === 'mockDriverToken') {
    res.send(lowdb.get('me-driver'));
  }

  res.send(lowdb.get('me-admin'));
});

server.get('/api/trucks/active-trucks', (req, res) => {
  res.send(lowdb.get('getTrucks'));
});

server.get('/api/trucks/all-trucks', (req, res) => {
  res.send(lowdb.get('getTrucks'));
});

server.get('/api/trucks/:id', (req, res) => {
  res.send(lowdb.get('getTruckItem'));
});

server.post('/api/trucks', (req, res) => {
  res.send();
});

server.delete('/api/trucks/:id', (req, res) => {
  res.send();
});

server.get('/api/sites/active-sites', (req, res) => {
  res.send(lowdb.get('getSites'));
});

server.get('/api/sites/all-sites', (req, res) => {
  res.send(lowdb.get('getSites'));
});

server.get('/api/sites/:id', (req, res) => {
  res.send(lowdb.get('getSiteItem'));
});

server.post('/api/sites', (req, res) => {
  res.send();
});

server.delete('/api/sites/:id', (req, res) => {
  res.send();
});

server.get('/api/sites/transportable-cargo/:id', (req, res) => {
  res.send(lowdb.get('getSiteTransportableCargos'));
});

server.get('/api/sites/available-trucks/:id', (req, res) => {
  res.send(lowdb.get('getSiteAvailableTrucks'));
});

server.get('/api/sites/available-drivers/:id', (req, res) => {
  res.send(lowdb.get('getSiteAvailableDrivers'));
});

server.get('/api/stores/active-stores', (req, res) => {
  res.send(lowdb.get('getStores'));
});

server.get('/api/stores/all-stores', (req, res) => {
  res.send(lowdb.get('getStores'));
});

server.get('/api/stores/:id', (req, res) => {
  res.send(lowdb.get('getStoreItem'));
});

server.post('/api/stores', (req, res) => {
  res.send();
});

server.delete('/api/stores/:id', (req, res) => {
  res.send();
});

server.get('/api/cargos/active-cargos', (req, res) => {
  res.send(lowdb.get('getCargos'));
});

server.get('/api/cargos/all-cargos', (req, res) => {
  res.send(lowdb.get('getCargos'));
});

server.get('/api/cargos/:id', (req, res) => {
  res.send(lowdb.get('getCargoItem'));
});

server.post('/api/cargos', (req, res) => {
  res.send();
});

server.delete('/api/cargos/:id', (req, res) => {
  res.send();
});

server.get('/api/transport/all-transports', (req, res) => {
  res.send(lowdb.get('getAllTransport'));
});

server.get('/api/transport/:id', (req, res) => {
  res.send(lowdb.get('getTransport'));
});

server.post('/api/transport', (req, res) => {
  res.send();
});
server.put('/api/transport/:id', (req, res) => {
  res.send();
});

server.delete('/api/transport/:id', (req, res) => {
  res.send();
});

server.use(pause(3000)).post('/api/calculate-travel-time', (req, res) => {
  res.send(lowdb.get('calculateTravelTimeNinePlus'));
});

server.use(router);
server.listen(port, () => {
  console.log('JSON Mock Server is running on port: ', port);
});
