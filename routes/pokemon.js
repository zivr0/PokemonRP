const express = require('express');
const router = express.Router();

router.get('/new', (req, res) => {
  res.render('pokemon/new');
});

router.post('/', (req, res) => {});
module.exports = router;
