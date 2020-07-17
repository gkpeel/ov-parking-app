const mongoose = require('mongoose');

const SpaceSchema = new mongoose.Schema({
	number: {
		type: Number,
		required: true,
	},
	unitNumber: {
		type: Number,
		required: true,
	},
});

const Space = mongoose.model('Space', SpaceSchema);

module.exports = Space;
