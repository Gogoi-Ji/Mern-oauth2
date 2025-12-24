// server/routes/authRoutes.js
const express = require('express');
const router = express.Router();

// controllers will be added later
const { googleAuth, googleCallback, facebookAuth, facebookCallback, logout } = require('../controllers/authController');

// Google OAuth endpoints
router.get('/google', googleAuth);
router.get('/google/callback', googleCallback);

// Facebook OAuth endpoints
router.get('/facebook', facebookAuth);
router.get('/facebook/callback', facebookCallback);

// Logout
router.post('/logout', logout);

module.exports = router;
