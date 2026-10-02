const express = require('express');
const router = express.Router();
const markController = require('../controllers/markController');

router.post('/', markController.addMarks);
router.get('/student/:studentId', markController.getMarksByStudent);

module.exports = router;
