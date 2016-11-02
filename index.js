'use strict';

import http from 'http';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import router from './modules/gmusic';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/gmusic', router);

app.use((err, req, res, next) => {
  console.log(err);
  res.send(err.stack);
});

const port = process.env.PORT || 4100;
const server = http.createServer(app);
server.listen(port);
console.log('listening on port ' + port);
