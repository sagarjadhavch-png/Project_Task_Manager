 const router = require('express').Router();
const controller = require('../controllers/projectController');

router.get('/', controller.getAll);
router.post('/', controller.create);
router.delete('/:id', controller.remove);

module.exports = router;