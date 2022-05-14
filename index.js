require('dotenv').config();
require('./models/asociaciones');

const Server = require('./models/server');

const server = new Server();

server.listen();