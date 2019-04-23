'use strict';

const errorResponseBuilder = require('../common/errors/errorResponseBuilder');
const commandService = require('./lib/commandService');

module.exports = async function (context, req) {
    context.log.verbose('Issuing a remote command' + JSON.stringify(req.body)); //TODO: validate body

    try {
        const result = await commandService.issueCommand(req.params.id, req.body);
        context.res = {
            headers: {
                'Content-Type': 'application/json'
            },
            status: result.status,
            body: result.payload
        };
    } catch (err) {
        context.log.error(err);
        context.res = errorResponseBuilder.build(err);
    }
};