'use strict';

const errorResponseBuilder = require('../common/errors/errorResponseBuilder');
const iotSearchService = require('./lib/botSearchService');

module.exports = async function (context, req) {
    context.log.verbose('List new devices');

    try {
        const result = await iotSearchService.findBots({
            online: req.query.online === 'true'
        });
        context.res = {
            headers: {
                'Content-Type': 'application/json'
            },
            body: result
        };
    } catch (err) {
        context.log.error(err);
        context.res = errorResponseBuilder.build(err);
    }
};