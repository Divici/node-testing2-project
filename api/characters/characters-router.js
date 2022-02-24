const express = require('express');
const CharactersModel = require('./characters-model');

const router = express.Router();

router.get('/', (req, res, next) => {
//   CharactersModel.getAll()
//     .then(characters => {
//       res.status(200).json(characters);
//     })
//     .catch(next); // our custom err handling middleware in server.js will trap this
    next()
});

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    })
  })

module.exports = router;