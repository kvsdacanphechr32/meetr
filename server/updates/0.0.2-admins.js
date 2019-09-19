// Create default dev user for CMS
exports = module.exports = function(done) {
	
	const keystone = require('keystone'),
		  User = keystone.list('User');

	if(!process.env.DEV_EMAIL || process.env.DEV_EMAIL.length < 1)
		throw new Error('Please specify a "DEV_EMAIL" value in your .env file, for default CMS user');
	
	new User.model({ 
		name: { first: 'Dev', last: 'User' }, 
		email: process.env.DEV_EMAIL
	}).save(done);

};