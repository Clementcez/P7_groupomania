const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/signup', userCtrl.signUp );
router.post('/login' ,userCtrl.logIn );

router.get('/profil/:username', auth, userCtrl.findWithUsername );
router.get('/:id', auth, userCtrl.findWithId );
router.get('/:id/messages', auth, userCtrl.findAllMyMessages );
router.get('/:id/coms', auth, userCtrl.findAllMyComments );
router.delete('/:id',auth ,userCtrl.delete );

module.exports = router;