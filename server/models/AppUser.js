/**
 * AppUser Model
 * ==========
 */
const mongoose = require('mongoose'),
Schema = mongoose.Schema;

var appUserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		index: true
	}
});


/**
 * Registration
 */
module.exports = mongoose.model('AppUser', appUserSchema);