const express = require('express');
const router = express.Router();
const checklistController = require('../controllers/checklistController');

router.post('/', checklistController.createChecklist);
router.get('/user/:userId', checklistController.getChecklistByUser);
router.put('/:checklistId/items/:itemId', checklistController.updateChecklistItem);
router.put('/:checklistId', checklistController.updateChecklist);
router.post('/regenerate/:userId', checklistController.regenerateChecklist);

module.exports = router;
