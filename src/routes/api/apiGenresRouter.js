const express = require('express');
const router = express.Router();
const apiGenresController = require('../../controllers/api/apiGenresController');

router.get('/api/genres', apiGenresController.list);
router.get('/api/genres/:id', apiGenresController.detail);


module.exports = router;