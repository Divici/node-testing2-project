const express = require('express');
const helmet = require('helmet');
const charactersRouter = require('./characters/characters-router');

const server = express();

server.use(helmet());
server.use(express.json());
server.use('/api/characters', charactersRouter);

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;