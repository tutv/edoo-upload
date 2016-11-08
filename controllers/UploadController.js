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
                data: {
                    url: data.link,
                    width: data.width,
                    height: data.height,
                    size: data.size,
                    type: data.type
                }
            });

            cleanFile(path_image);
        })
        .catch(function (error) {
            response.json({
                success: false,
                error: error
            });

            cleanFile(path_image);
        });
};

module.exports.uploadByURL = function (request, response, next) {
    let url_image = request.body.image;

    imgur.uploadByURL(url_image)
        .then(function (data) {
            response.json({
                success: true,
                data: {
                    url: data.link,
                    width: data.width,
                    height: data.height,
                    size: data.size,
                    type: data.type
                }
            });
        })
        .catch(function (error) {
            response.json({
                success: false,
                error: error
            });
        });
};

const fs = require('fs');

function cleanFile(path) {
    fs.unlink(path, function () {
        console.log('Delete success!');
    });
}