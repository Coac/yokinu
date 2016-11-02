'use strict';

const http = require('http');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/gmusic', require('./modules/gmusic'));

app.use((err, req, res, next) => {
  console.log(err);
  res.send(err.stack);
});

const port = process.env.PORT || 4100;
const server = http.createServer(app);
server.listen(port);
