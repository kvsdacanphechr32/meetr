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
const Project = require('../../models/Project');

/*
 * Create data
 */
exports.create = async (req, res) => { 

    let newProject = new Project({ name: req.body.name, description: req.body.description, user: req.body.userId });
 
    try {
        let saveRes = await newProject.save();
        res.json(saveRes);
    }
    catch(e) {
        res.status(500).json({e});
    }
}

/*
 * Get projects for user
 */
exports.get = async (req, res) => { 

    let userProjects = Project.find({user: req.params.userId}, 'name description _id');
 
    try {
        let getRes = await userProjects.exec();
        res.json(getRes);
    }
    catch(e) {
        res.status(500).json({e});
    }
}

