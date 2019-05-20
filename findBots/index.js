'use strict';

const errorResponseBuilder = require('../common/errors/errorResponseBuilder');
const iotSearchService = require('./lib/botSearchService');
const { endpoint } = require('../common/endpoint/endpoint');

module.exports = endpoint(async (context, req) => {
    context.log.verbose('List new devices');

    const result = await iotSearchService.findBots({
        online: req.query.online === 'true'
    });

    return {
        body: result
    };
});