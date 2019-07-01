'use strict';
/**
 * Engagement Journalism API server
 * 
 * About page Model
 * @module about
 * @class about
 * @author Johnny Richardson
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = global.keystone;
var Types = keystone.Field.Types;

/**
 * about model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var About = new keystone.List('About', 
	{
		label: 'About',
		singular: 'About',
		nodelete: true,
		nocreate: true
	});

/**
 * Model Fields
 * @main About
 */
About.add({
	
	name: { type: String, default: "About", hidden: true, required: true, initial: true },
	intro: { type: String, label: 'Site Intro Text', required: true, initial: true},
	introPara: { type: String, label: 'Site Intro Paragraph', required: true, initial: true},
	description: { type: Types.Markdown, label: 'Description Text', required: true, initial: true},
	who: { type: Types.Markdown, label: 'Who Was Involved Text', required: true, initial: true}
});

/**
 * Model Registration
 */
About.defaultSort = '-createdAt';
About.defaultColumns = 'name';
About.register();
