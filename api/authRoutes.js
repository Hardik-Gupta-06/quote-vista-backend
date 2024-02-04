const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createAccount, allowAccess, disableAccess, allowAutoAccess } = require('../controllers/authRoutes');

router.post('/signup' , createAccount);

router.post('/login' , allowAccess);

router.get('/logout' , disableAccess);

router.post("/autoLogin", allowAutoAccess);

module.exports = router;