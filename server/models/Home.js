'use strict';
/**
 * Engagement Journalism API server
 * 
 * Home page Model
 * @module home
 * @class home
 * @author Johnny Richardson
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = global.keystone;
var Types = keystone.Field.Types;

/**
 * home model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Home = new keystone.List('Home', 
	{
		label: 'Home',
		singular: 'Home',
		nodelete: true,
		nocreate: true
	});

/**
 * Model Fields
 * @main Home
 */
Home.add({
	
	name: { type: String, default: "Home", hidden: true, required: true, initial: true },
	screen1: { type: Types.Text, required: true, initial: true},
	screen2Column1: { type: Types.Markdown, required: true, initial: true},
	screen2Column2: { type: Types.Markdown, required: true, initial: true}

});

/**
 * Model Registration
 */
Home.defaultSort = '-createdAt';
Home.defaultColumns = 'name';
Home.register();
