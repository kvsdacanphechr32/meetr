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
const Progress = require('../../models/Progress');

/*
 * Create data
 */
exports.create = async (req, res) => { 

    const responses = req.body.responses;
    let sumX = 0;
    let sumY = 0;

    responses.slice(0, 4).forEach((n) => sumX += parseInt(n)-3);
    responses.slice(5, 9).forEach((n) => sumY += parseInt(n)-3);

    sumX += ((parseInt(responses[10])-3) + (parseInt(responses[11])-3));
    sumY += ((parseInt(responses[10])-3) + (parseInt(responses[11])-3));
    
    let newProgress = new Progress({ date: Date.now(), project: req.body.projectId, responses: req.body.responses, sumX: sumX, sumY: sumY });
 
    try {
        let saveRes = await newProgress.save();
        res.json(saveRes);
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

    let progQuery = Progress.findOne({project: req.params.projectId});
 
    try {
        let getRes = await progQuery.exec();
        res.json(getRes);
    }
    catch(e) {
        res.status(500).json({e});
    }
}