'use strict';

module.exports = (function () {
    var imgur = require('imgur');

    return {
        uploadByFile: uploadByFile,
        uploadByURL: uploadByURL
    };

    function uploadByFile(path) {
        return new Promise(function (resolve, reject) {
            imgur.uploadFile(path)
                .then(function (json) {
                    resolve(json.data);
                })
                .catch(function (err) {
                    reject(err);
                });
        });
    }

    function uploadByURL(url) {
        return new Promise(function (resolve, reject) {
            imgur.uploadUrl(url)
                .then(function (json) {
                    resolve(json.data);
                })
                .catch(function (err) {
                    reject(err);
                });
        });
    }
})();