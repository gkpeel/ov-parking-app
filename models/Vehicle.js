const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
	space: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Space',
	},
	make: {
		type: String,
		required: true,
	},
	model: {
		type: String,
		required: true,
	},
	color: {
		type: String,
		required: true,
	},
	licenseNumber: {
		type: String,
		required: true,
	},
	fullName: {
		type: String,
		required: true,
	},
	contactNumber: {
		type: String,
		required: true,
	},
	durationStart: {
		type: Date,
		required: true,
	},
	durationEnd: {
		type: Date,
		required: true,
	},
});

const Vehicle = mongoose.model('Vehicle', VehicleSchema);

module.exports = Vehicle;
