const express = require('express');
const router = express.Router();
const passport = require('passport');

// @desc    Show Parking registry for that day
// @route   GET /
router.get('/', (req, res) => {
	res.render('index');
});

// @desc	Show Login Page
// @route	GET /login
router.get('/login', (req, res) => {
	res.render('login', {
		login: true,
	});
});

// @desc    Show Dashboard of Users owned Parking Spots
// @route    GET /dashboard
router.get('/dashboard', (req, res) => {
	res.render('dashboard');
});

// @desc	Submit Login Request
// @route	POST /login
router.post('/login', (req, res, next) => {
	passport.authenticate('local', {
		successRedirect: '/dashboard',
		failureRedirect: '/test',
		failureFlash: false,
	})(req, res, next);
});

module.exports = router;
