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

    let homeFields = 'tagline screen1 talk track why.html what.html -_id';
    let aboutFields = 'intro para1 para2 what.html why.html guidePdf.url -_id';
    let aboutStudiesFields = 'caseStudiesIntro -_id';
    let aboutActivityFields = 'guidePdf.url -_id';
    let studiesFields = 'name description url -_id';
    let activityFields = 'name intro step1.html step2.html step3.html step4.html step5.html';
    let projectFields = 'name user -_id'
    let userFields = 'name email'

    let home = keystone.list('Home').model;
    let about = keystone.list('About').model;
    let study = keystone.list('CaseStudy').model;
    let activity = keystone.list('Activity').model;
    let projects = require('../../models/Project');
    let appuser = require('../../models/AppUser');

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

    }
    else if(type === 'dump') {

        let finalRes = [];
        // Get all data
        data = appuser.find({}, userFields);
        // data = projects.find({}, projectFields).populate('user', 'name -_id');
        data.exec().then(results => {
            return Promise.all(results.map(user => {
                return projects.find({user: user._id}, 'name description -_id')
                .exec()
                .then((projData) => {
                    let updatedUser = Object.assign(user, projData)
                    // user.projects = projData
                    console.log(user, updatedUser)
                    return updatedUser
                });
            }));
        }).then(final => {

            try {
                res.json(final);
            } catch (e) {
                console.error(e)
                res.status(500).json({
                    e
                });
            }

        });
        // data = [];
        // _l.each(results, async function(r) {
        //     console.log(r._id)
        //     let projQ = projects.find({user: r._id}, 'name description -_id');
        //     let projData = await projQ.exec();
        //     r.projects = projData
        //     data.push(r)
        // })
        return;
    }
    else {
        
        // Get all studies
        let introData = about.findOne({}, aboutStudiesFields);
        data = study.find({}, studiesFields);

        getRes.push(await introData.exec());
        
    }

    try {
        getRes.push(await data.exec());
        res.json(getRes);
    } catch (e) {
        console.error(e)
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