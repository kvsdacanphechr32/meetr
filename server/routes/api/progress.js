'use strict';
/**
 * Developed by Engagement Lab, 2019
 * ==============
 * Route to handle project progress creation/retrieval
 * @author Johnny Richardson
 * @class api
 *
 * ==========
 */
const Progress = require('../../models/Progress'),
      Project = require('../../models/Project');

/*
 * Create data
 */
exports.create = async (req, res) => { 

    const responses = req.body.responses;
    let sumX = 0;
    let sumY = 0;

    // Calculate responses to plot as sums
    responses.slice(0, 5).forEach((n) => sumX += parseInt(n)-3);
    responses.slice(5, 10).forEach((n) => sumY += parseInt(n)-3);

    sumX += (parseInt(responses[10])-3 + parseInt(responses[11])-3);
    sumY += (parseInt(responses[10])-3 + parseInt(responses[11])-3);
    
    let newProgress = new Progress({ date: Date.now(), project: req.body.projectId, responses: req.body.responses, sumX: sumX, sumY: sumY });
    let userProject = Project.findOne({_id: req.body.projectId}, 'slug');
 
    try {
        await newProgress.save();
        let getProjectRes = await userProject.exec();
        res.send({slug: getProjectRes.slug});
    }
    catch(e) {
        console.error(e);
        res.status(500).json({e});
    }
}

/*
 * Get progress for project
 */
exports.get = async (req, res) => { 

    let progQuery = Progress.findOne({project: req.params.projectId}, {sort: {date:1}});
 
    try {
        let getRes = await progQuery.exec();
        res.json(getRes);
    }
    catch(e) {
        res.status(500).json({e});
    }
}