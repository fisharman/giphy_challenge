const express = require('express');
const router = express.Router();
const savegifsController = require('../controllers/savegifsController')

router.post('/', savegifsController.index);

module.exports = router;
