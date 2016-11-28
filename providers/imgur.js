'use strict';

function helperConverterSSL(data) {
    let link = data.link || '';
    link = link.replace('http://', 'https://');
    data.link = link;

    return data;
}

module.exports = (function () {
    let imgur = require('imgur');

    return {
        uploadByFile: uploadByFile,
        uploadByURL: uploadByURL
    };

    function uploadByFile(path) {
        return new Promise(function (resolve, reject) {
            imgur.uploadFile(path)
                .then(function (json) {
                    let data = json.data;
                    data = helperConverterSSL(data);

                    resolve(data);
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
                    let data = json.data;
                    data = helperConverterSSL(data);

                    resolve(data);
                })
                .catch(function (err) {
                    reject(err);
                });
        });
    }
})();