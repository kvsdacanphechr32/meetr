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
const AppUser = require('../../models/AppUser');

let createUser = async (req, res) => { 

    let newUser = new AppUser({ name: req.body.name, email: req.body.email, sub: req.body.sub, imgUrl: req.body.img});
 
    try {
        let saveRes = await newUser.save();
        res.json(saveRes);
    }
    catch(e) {
        res.sendStatus(500);
    }
};

/*
 * Check if user for email exists and create one if not
 */
exports.exists = async (req, res) => { 

    let userFind = AppUser.findOne({$or: [{email: req.body.email}, {sub: req.body.sub}]}, '_id imgUrl');
 
    try {
        let userRes = await userFind.exec();

        if(!userRes || (userRes && userRes.length < 1))
            createUser(req, res);
        else
            res.status(200).send(userRes);
    }
    catch(e) {
        console.error(e);
        res.status(500).send(e);
    }
}

/*
 * Create data
 */
exports.create = (req, res) => {
    createUser(req, res);
}