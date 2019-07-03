/**
 * Project Model
 * ==========
 */
const mongoose = require('mongoose'),
Schema = mongoose.Schema;

var projectSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true,
    },
    user: {
		type: Schema.Types.ObjectId,
		ref: 'AppUser'
	},
	slug: {
		type: String
	}
});


/**
 * Registration
 */
module.exports = mongoose.model('Project', projectSchema);