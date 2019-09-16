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
	tagline: { type: Types.Text, required: true, initial: true},
	screen1: { type: Types.Text, label: 'How it works', required: true, initial: true},
	talk: { type: Types.Text, label: 'Talk it out', required: true, initial: true},
	track: { type: Types.Text, label: 'Track your progress', required: true, initial: true},
	// screen2Para: { type: Types.Markdown, label: 'Screen 2 Paragraph', required: true, initial: true},
	// screen2Column2: { type: Types.Markdown, required: true, initial: true}

});

/**
 * Model Registration
 */
Home.defaultSort = '-createdAt';
Home.defaultColumns = 'name';
Home.register();
