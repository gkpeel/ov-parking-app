const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const passport = require('passport');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const session = require('express-session');
const flash = require('connect-flash');
const morgan = require('morgan');
const connectDB = require('./config/db');
const MongoStore = require('connect-mongo')(session);

// Load Config
dotenv.config({ path: './config/config.env' });

// Passport Config
require('./config/passport')(passport);

connectDB();

const app = express();

// Bodyparser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Logging
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// Handlebar Helpers
const { anyTrue } = require('./helpers/hbs');

// Handlebars
app.engine('.hbs', exphbs({ helpers: { anyTrue }, defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

// Sessions
app.use(
	session({
		secret: 'vistavista',
		resave: true,
		saveUninitialized: true,
	})
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global vars
app.use((req, res, next) => {
	res.locals.user = req.user || null;
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.errors = req.flash('errors');
	console.log(res.locals);
	next();
});

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./routes/index'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
