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
mongoose = global.keystone.get('mongoose'),
Bluebird = require('bluebird');

mongoose.Promise = require('bluebird');

var buildData = (res) => {

let aboutFields = 'intro introPara description.html who.html -_id';
let articleFields = 'name description image.public_id url dataUrl -_id';
let guideFields = 'name description image.public_id file.url isSyllabus -_id';
let videoFields = 'name description videoId -_id';

let about = keystone.list('About').model;
let article = keystone.list('Article').model;
let guide = keystone.list('Guide').model;
let video = keystone.list('Video').model;

// Get about
let aboutData = about.findOne({}, aboutFields);
// Get all articles
let articleData = article.find({}, articleFields);
// Get all guides
let guideData = guide.find({}, guideFields);
// Get all videps
let videoData = video.find({}, videoFields);

Bluebird.props({
        about: aboutData,
        articles: articleData,
        guides: guideData,
        videos: videoData
    })
    .then(results => {
        if(!results)
            return res.status(204).send();

        return res.status(200).json({
            status: 200,
            data: results
        });
    }).catch(err => {
        console.error(err);
        return res.status(400);
    });

}


/*
 * Get data
 */
exports.get = function (req, res) {

    return buildData(res);

}
