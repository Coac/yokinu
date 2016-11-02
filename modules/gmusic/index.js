'use strict';

import config from '../../config';
import express from 'express';
import Library from './library';

const router = express.Router();

if (!config) throw new Error('No config found for module : gmusic');

router.get('/', (req, res, next) => {
  var library = new Library();
  library.init({
    email: config.email,
    password: config.password
  })
.then(res.json.bind(res))
      .catch(next);
});

export default router;
