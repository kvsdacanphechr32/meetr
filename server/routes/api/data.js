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
const keystone = global.keystone;

var buildData = async (res) => {

let aboutFields = 'intro introPara description.html who.html -_id';
let activityFields = 'name intro step1.html step2.html step3.html step4.html step5.html';

// let about = keystone.list('About').model;
let activity = keystone.list('Activity').model;

// Get about
// Get all activity
let activityData = activity.find({}, activityFields);

try {
    let getRes = await activityData.exec();
    res.json(getRes);
}
catch(e) {
    res.status(500).json({e});
}

// let propQuery = activityData;
// Bluebird.props(propQuery)
//     .then(results => {
//         if(!results)
//             return res.status(204).send();

//         return res.status(200).json(results);
//     }).catch(err => {
//         console.error(err);
//         return res.status(400);
//     });

}


/*
 * Get data
 */
exports.get = function (req, res) {

    return buildData(res);

}
