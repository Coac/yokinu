'use strict';

const config = require('../../config').gmusic;
const router = require('express').Router();
const Library = require('./library');

if (!config) throw new Error('No config found for module : gmusic');

router.get('/', (req, res, next) => {
  var library = new Library();
  library
        .init({
          email: config.email,
          password: config.password
        })
        .then(res.json.bind(res))
        .catch(next);
});

module.exports = router;
