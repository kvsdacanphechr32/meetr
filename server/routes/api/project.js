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

    let displayName = req.body.name.replace(/ /g, '-').toLowerCase();
    let newProject = new Project({ name: req.body.name, description: req.body.description, user: req.body.userId, slug: displayName });
 
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
exports.getAll = async (req, res) => { 

    let userProjects = Project.find({user: req.params.userId}, 'name description slug -_id');
 
    try {
        let getRes = await userProjects.exec();
        res.json(getRes);
    }
    catch(e) {
        res.status(500).json({e});
    }
}

/*
 * Get project by id
 */
exports.get = async (req, res) => { 

    let userProjects = Project.findOne({user: req.params.userId, slug: req.params.projectId});
 
    try {
        let getRes = await userProjects.exec();
        res.json(getRes);
    }
    catch(e) {
        res.status(500).json({e});
    }
}

