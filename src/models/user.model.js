const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	id: Number,
	user_name: String,
	account_number: Number,
	email_address: String,
	identity_number: Number,
}, {
	timestamps: true
});

module.exports = mongoose.model('Users', UserSchema);
