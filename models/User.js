const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	fullName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	contactNumber: {
		type: String,
		required: true,
	},
	units: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Space',
	},
	defaultVehicle: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Vehicle',
	},
	userType: {
		type: String,
		default: 'editor',
	},
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
