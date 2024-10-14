const path = require('path');
const jsonServer = require('json-server');
const pause = require('connect-pause');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'mock-db.json'));
const port = 5000;

server.use(pause(1000));
server.use(jsonServer.bodyParser);

const lowdb = router.db;

server.use(router);
server.listen(port, () => {
  console.log('JSON Mock Server is running on port: ', port);
});
