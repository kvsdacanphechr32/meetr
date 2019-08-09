'use strict';
/**
 * Developed by Engagement Lab, 2019
 * ==============
 * Route to retrieve all data
 * @class api
 * @author Johnny Richardson
 *
 * ==========
 */
const keystone = global.keystone,
      _l = require('lodash');

var buildData = async (type, res) => {

    let homeFields = 'screen1 screen2Column1.html screen2Column2.html screen2Para.html -_id';
    let aboutFields = 'image.public_id para1.html para2.html -_id';
    let aboutStudiesFields = 'caseStudiesIntro -_id';
    let aboutActivityFields = 'guidePdf.url -_id';
    let studiesFields = 'name description url -_id';
    let activityFields = 'name intro step1.html step2.html step3.html step4.html step5.html';

    let home = keystone.list('Home').model;
    let about = keystone.list('About').model;
    let study = keystone.list('CaseStudy').model;
    let activity = keystone.list('Activity').model;
    let data = null;
    let getRes = [];

    if (type === 'home') {
        // Get home
        data = home.findOne({}, homeFields);
    }
    else if (type === 'about') {
        // Get about
        data = about.findOne({}, aboutFields);
    } else if(type === 'activity') {
        
        // Get all activities
        data = activity.find({}, activityFields).sort({order: 1});
        let fileData = about.findOne({}, aboutActivityFields);

        getRes.push(await fileData.exec());

    } else {
        
        // Get all studies
        let introData = about.findOne({}, aboutStudiesFields);
        data = study.find({}, studiesFields);

        getRes.push(await introData.exec());
        
    }

    try {
        getRes.push(await data.exec());
        res.json(getRes);
    } catch (e) {
        res.status(500).json({
            e
        });
    }

};

/*
 * Get data
 */
exports.get = function (req, res) {

    return buildData(req.params.type, res);

}