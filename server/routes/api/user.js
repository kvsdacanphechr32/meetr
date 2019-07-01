'use strict';
/**
 * Developed by Engagement Lab, 2019
 * ==============
 * Route to handle project creation/retrieval
 * @class api
 * @author Johnny Richardson
 *
 * ==========
 */
const mongoose = require('mongoose'),
Bluebird = require('bluebird');

mongoose.Promise = require('bluebird');
const AppUser = require('../../models/AppUser');

/*
 * Create data
 */
exports.create = async function (req, res) { 

    var book1 = new AppUser({ name: 'Test', email: 'email@domain.edy' });
 
    try {
        let saveRes = await book1.save();
        res.send('done');
    }
    catch(e) {
        console.error(e);
    }
}
