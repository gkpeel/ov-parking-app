const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const WhiteList = require('../models/Whitelist');
const User = require('../models/User');

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

// @desc    Show registration page
// @route   GET /register
router.get('/register', (req, res) => {
	res.render('register', {
		register: true,
	});
});

// @desc    Add user to the database
// @route   GET /register
router.post('/register', async (req, res) => {
	const { fullName, contactNumber, website, email, password, password2 } = req.body;

	// Get WhiteList from database
	let whitelist = await WhiteList.find({});
	whitelist = whitelist[0].email;

	// Check for errors
	let errors = [];
	if (!whitelist.includes(email)) {
		errors.push({ msg: 'Your email is not on the pre-approved whitelist. Please contact the Condo Association to be included' });
	}

	if (password !== password2) {
		errors.push({ msg: 'Passwords do not match' });
	}

	if (password.length < 6) {
		errors.push({ msg: 'Password must be at least 6 characters' });
	}

	if (!fullName || !contactNumber || !email || !password || !password2) {
		errors.push({ msg: 'Please enter all fields' });
	}

	// Spam Honeypot
	if (website) {
		res.redirect('/');
	}

	if (errors.length > 0) {
		res.render('register', {
			register: true,
			errors,
			fullName,
			contactNumber,
			email,
			password,
			password2,
		});
	} else {
		const alreadyInDb = await User.findOne({ email: email });
		if (alreadyInDb) {
			errors.push({ msg: 'This email has already been registered. Please contact the Condo Association if you need help logging in.' });
			res.redirect('/login');
		} else {
			let newUser = new User({
				fullName,
				contactNumber,
				email,
				password,
			});

			// Hash Password and Save New User to the Database
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, async (err, hash) => {
					if (err) throw err;

					// Set password to hashed
					newUser.password = hash;

					// Save user
					const conf = await newUser.save();

					req.flash('success_msg', 'You are now registered and can log in');
					res.redirect('/login');
				});
			});
		}
	}
});

// @desc	Submit Login Request
// @route	POST /login
// router.post('/login', (req, res, next) => {
// 	console.log(req.body);
// 	passport.authenticate('local', {
// 		successRedirect: '/dashboard',
// 		failureRedirect: '/login',
// 		failureFlash: false,
// 	})(req, res, next);
// });

module.exports = router;
