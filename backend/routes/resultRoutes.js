const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController');

router.get('/topper', resultController.getTopper);
router.get('/subject-analysis', resultController.getSubjectAnalysis);
router.get('/:rollNumber', resultController.getResultByRollNumber);

module.exports = router;
