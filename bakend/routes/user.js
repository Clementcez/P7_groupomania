const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/signup', userCtrl.signUp );
router.post('/login' ,userCtrl.logIn );

router.get('/:id', auth, userCtrl.find );
router.get('/:id/messages', auth, userCtrl.findAllMyMessages );
router.delete('/:id',auth ,userCtrl.delete );

module.exports = router;