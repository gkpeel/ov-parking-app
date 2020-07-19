const mongoose = require('mongoose');

const WhiteListSchema = new mongoose.Schema({
	email: [String],
});

const WhiteList = mongoose.model('WhiteList', WhiteListSchema);

module.exports = WhiteList;
