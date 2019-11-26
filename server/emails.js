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

const SendEmail = function() {

    let mailgun = require('mailgun-js')({
        apiKey: process.env.MAILGUN_KEY,
        domain: process.env.MAILGUN_DOMAIN
    });
    // Get all projects where reminder interval not null
    let projects = Project.find({reminderPeriod: {$ne: null}}, 'name slug reminderEmail -_id');
 
    try {
        let getRes = await projects.exec();
        let recipientData = [];

        getRes.forEach((project, i) => {

            let subjectLine = 'Meetr reminder for your project "' + project.name + '"';
            // let body = '<img src="http://bit.ly/2YKMNyC" style="width:120px"><h4>Form Message</h4>';
            
            let body = 'It has been ';
            
            recipientData.push({
                from: '<noreply@meetr.in>',
                to: project.reminderEmail,
                subject: subjectLine,
                text: body
            });

        });

        mailgun.messages().send(data, function (error, body) {
            if (error) {
                console.error('Mailgun error: ' + error)
                throw new Error('Mailgun error: ' + error)
            }
        });
    }
    catch(e) {
        throw new Error(e);
    }
}
}

exports.url = urlValidator;