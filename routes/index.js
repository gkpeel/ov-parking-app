const express = require('express');
const router = express.Router();

// @desc    Show Parking registry for that day
// @route   GET /
router.get('/', (req, res) => {
	res.render('index');
});

// @desc    Show Dashboard of Users owned Parking Spots
// route    GET /dashboard
router.get('/dashboard', (req, res) => {
	res.send('hello world - dashboard');
});

module.exports = router;
