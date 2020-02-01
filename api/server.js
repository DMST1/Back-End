const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

//Authentication middleware for Users
//Routers for AUTH and USERS

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

module.exports = server;