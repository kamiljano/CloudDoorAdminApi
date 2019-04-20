'use strict';

const registrationService = require('./services/registrationService');
const errorResponseBuilder = require('../common/errors/errorResponseBuilder');

module.exports = async function (context, req) {
    context.log.verbose('Registering a new device: ' + JSON.stringify(req.body));

    try {
        const device = await registrationService.register();
        context.res = {
            headers: {
                'Content-Type': 'application/json'
            },
            body: device
        };
    } catch (err) {
        context.log.error(err);
        context.res = errorResponseBuilder.build(err);
    }
};