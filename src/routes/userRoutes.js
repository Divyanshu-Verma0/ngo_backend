const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const { authenticate } = require('../middleware/auth');

router.use(authenticate);

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);

module.exports = router;