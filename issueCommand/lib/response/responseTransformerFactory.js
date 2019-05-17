'use strict';

const _ = require('lodash');

const transformers = Object.freeze({
    fileUpload: {
        transform: (req, resBody) => {
            const result = _.cloneDeep(resBody);
            result.uploads.forEach(upload => {
                if (upload.status === 'UPLOADED') {
                    upload.storage = {
                        path: `uploads/${req.params.id}/${upload.path.replace(/\\/g, '/')}`
                    };
                }
            });
            return result;
        }
    }
});

const doNothingTransformer = Object.freeze({
    transform: (req, resBody) => resBody
});

module.exports.getResponseTransformer = commandName => {
    const transformer = transformers[commandName];

    return transformer ? transformer : doNothingTransformer;
};