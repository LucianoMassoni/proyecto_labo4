require('dotenv').config();


const server = require('./models/server');

const svr = new server();

svr.listen();

