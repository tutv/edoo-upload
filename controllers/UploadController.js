'use strict';

const imgur = require('../providers/imgur');

module.exports.uploadByFile = function (request, response, next) {
    let image = request.file;
    if (!image) {
        return response.json(false);
    }

    let path_image = image.path;
    imgur.uploadByFile(path_image)
        .then(function (data) {
            response.json({
                success: true,
                url: data.link
            });
        })
        .catch(function (error) {
            response.json({
                success: false,
                error: error
            });
        });
};

module.exports.uploadByURL = function (request, response, next) {
    let url_image = request.body.image;

    imgur.uploadByURL(url_image)
        .then(function (data) {
            response.json({
                success: true,
                url: data.link
            });
        })
        .catch(function (error) {
            response.json({
                success: false,
                error: error
            });
        });
};