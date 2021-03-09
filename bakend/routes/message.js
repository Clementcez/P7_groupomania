const express = require('express');
const router = express.Router();

const ctrlMess = require('../controllers/message');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, ctrlMess.createMessage);
router.put('/:id', auth, multer, ctrlMess.modifMessage);
router.delete('/:id', auth, ctrlMess.deleteMessage);
router.get('/', auth, ctrlMess.readAllMessages);

module.exports = router;