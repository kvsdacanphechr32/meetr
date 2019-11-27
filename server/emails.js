'use strict';
/**
 * Engagement Journalism API server
 * Developed by Engagement Lab, 2019
 * ==============
 * Script for sending out project survey reminder emails
 *
 * @author Johnny Richardson
 *
 * ==========
 */

require('dotenv').load();

const SendEmail = async function() {
    
    const Project = require('./models/Project'),
    mongoose = require('mongoose'),
    mailgun = require('mailgun-js')({
        apiKey: process.env.MAILGUN_KEY,
        domain: process.env.MAILGUN_DOMAIN
    });

    // Register user schema
    require('./models/AppUser');
    
    try {
        await mongoose.connect('mongodb://localhost/engagement-journalism', {useNewUrlParser: true, useUnifiedTopology: true});
    } catch (error) {
        throw new Error('Mongoose error!', error);
    }

    // Get all projects where reminder interval not null, and populate user for each
    let projects = Project.find({reminderPeriod: {$ne: null}}, 'name slug reminderEmail -_id').populate('user');

    // todo: check time delta
    try {
        let getRes = await projects.exec();
        let recipientEmails = [];
        let recipientData = {};
        
        getRes.forEach((project, i) => {
            
            recipientEmails.push(project.reminderEmail);
            recipientData[project.reminderEmail] = {
                from: '<noreply@meetr.in>',
                to: project.reminderEmail,
                project: project.name,
                slug: project.slug,
                name: project.user.name
            };
            
        });
        
        var data = {
            'recipient-variables': recipientData,
            from: 'Meetr <noreply@meetr.in>',
            to: recipientEmails,
            subject: 'Meetr reminder for your project "%recipient.project%"',
            html: 
                '<img src="https://res.cloudinary.com/engagement-lab-home/image/upload/c_scale,w_150/v1565109667/engagement-journalism/img/meetr_logo_raster.png" alt="Meetr logo" /><br />' +
                '<p>This is a reminder that it\'s time to take the track progress for your project "%recipient.project%" on Meetr. Please <a href="https://meetr.in/projects/%recipient.slug%/track">click here</a> to do so!</p><p>- Meetr</p>'
        };
        
        mailgun.messages().send(data, function (error, body) {
            if (error) {
                console.error('Mailgun error: ' + error)
                throw new Error('Mailgun error: ' + error)
            }
            process.exit(22);
        });
    }
    catch(e) {
        throw Error(e);        
    }
};
SendEmail().catch(err => {
    console.error(err); 
    return process.exit(22);
});