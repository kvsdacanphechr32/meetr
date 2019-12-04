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

const SendEmail = async function () {

    const Project = require('./models/Project'),
        mongoose = require('mongoose'),
        mailgun = require('mailgun-js')({
            apiKey: process.env.MAILGUN_KEY,
            domain: process.env.MAILGUN_DOMAIN
        }),
        winston = require('winston');
        const logger = winston.createLogger({
            level: 'info',
            format: winston.format.simple(),
            transports: [
                new(winston.transports.File)({filename: __dirname + '/emails.log', level: 'info'})
            ]
        });

    // Register user schema
    require('./models/AppUser');

    // DB connect
    try {
        await mongoose.connect('mongodb://localhost/engagement-journalism', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
    } catch (error) {
        throw new Error('Mongoose error!', error);
    }

    logger.info('----' + new Date() + '----');

    // Get all projects where reminder interval not null, and populate user for each
    let projects = Project.find({
        reminderPeriod: {
            $ne: null
        }
    }, 'name slug reminderPeriod reminderEmail lastReminderDate').populate('user');

    try {
        let getRes = await projects.exec();
        let recipientEmails = [];
        let recipientData = {};

        getRes.forEach((project, i) => {

            // Get time difference from last reminder date and today
            let dayDelta = new Date().getTime() - new Date(project.lastReminderDate).getTime();
            // Get delta in days by dividing by milliseconds in one day
            let daysSince = parseInt(dayDelta / (1000 * 3600 * 24));

            // Should email be sent?
            let send = false;

            switch (project.reminderPeriod) {
                case 0:
                    send = daysSince >= 14;
                    break;
                case 1:
                    send = daysSince >= 30;
                    break;
                case 2:
                    send = daysSince >= 60;
                    break;
            }

            // If period not triggered, skip
            if (!send)
                return;

            recipientEmails.push(project.reminderEmail);
            recipientData[project.reminderEmail] = {
                from: '<noreply@meetr.in>',
                to: project.reminderEmail,
                project: project.name,
                slug: project.slug,
                name: project.user.name
            };

            console.log('=> Reminder for project "%s" to %s ', project.name, project.reminderEmail);

        });

        // If no recipients, quit
        if (recipientEmails.length === 0)
            process.exit(22);

        const subject = (process.env.NODE_ENV !== 'production' ? '(TESTING) ' : '') + 'Meetr reminder for your project "%recipient.project%"';
        const data = {
            'recipient-variables': recipientData,
            from: 'Meetr <noreply@meetr.in>',
            to: recipientEmails,
            subject: subject,
            html: '<img src="https://res.cloudinary.com/engagement-lab-home/image/upload/c_scale,w_150/v1565109667/engagement-journalism/img/meetr_logo_raster.png" alt="Meetr logo" /><br />' +
                '<p>This is a reminder that it\'s time to take the track progress for your project "%recipient.project%" on Meetr.' +
                'Please <a href="https://meetr.in/projects/%recipient.slug%/track">click here</a> to do so!</p><p>- Meetr</p>'
        };


        // Send message batch, and updated affected projects
        mailgun.messages().send(data, async function (error, body) {
            if (error) {
                console.error('Mailgun error: ' + error)
                throw new Error('Mailgun error: ' + error)
            }

            console.log('==> Sent ' + recipientEmails.length + ' reminder(s)');

            // If success, we need to update all affected projects w/ 
            // new last reminder date
            await Promise.all(getRes.map(async (project) => {
                project.lastReminderDate = new Date(Date.now()).toISOString();
                await project.save();
            }));

            // Exit script
            process.exit(22);
        });
    } catch (e) {
        throw Error(e);
    }
};

SendEmail().catch(err => {
    // Print error and quit
    console.error(err);
    return process.exit(22);
});