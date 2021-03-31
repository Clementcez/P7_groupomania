const express = require('express');
const router = express.Router();

const ctrlMess = require('../controllers/message');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, ctrlMess.createMessage);
router.post('/:id/coms', auth, ctrlMess.createComment);
router.put('/:id', auth, multer, ctrlMess.modifMessage);
router.delete('/:id', auth, ctrlMess.deleteMessage);
router.delete('/:id/coms/:id', auth, ctrlMess.deleteComment);
router.get('/', auth, ctrlMess.readAllPosts);

module.exports = router;