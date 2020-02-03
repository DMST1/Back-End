const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const userRouter = require("../users/users-router");
const authRouter = require("../auth/auth-router");

const authenticate = require('../auth/auth-middleware')

//Authentication middleware for Users
//Routers for AUTH and USERS

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/user", authenticate, userRouter);

module.exports = server;
