const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load User Model
const User = require('../models/User');

module.exports = function (passport) {
	passport.use(
		new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
			// Match User
			const user = await User.findOne({ email: email });
			console.log(user);

			try {
				if (!user) {
					return done(null, false, { message: 'That email is not registered' });
				}

				// Match password
				bcrypt.compare(password, user.password, (err, isMatch) => {
					if (err) throw err;

					if (isMatch) {
						return done(null, user);
					} else {
						return done(null, false, { message: 'Password is incorrect' });
					}
				});
			} catch (err) {
				console.error(err);
			}
		})
	);

	passport.serializeUser((id, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		User.findById(id, (err, user) => {
			done(err, user);
		});
	});
};
