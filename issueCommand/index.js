'use strict';

const errorResponseBuilder = require('../common/errors/errorResponseBuilder');
const commandService = require('./lib/commandService');
const {getResponseTransformer} = require('./lib/response/responseTransformerFactory');

module.exports = async function (context, req) {
    context.log.verbose('Issuing a remote command' + JSON.stringify(req.body)); //TODO: validate body

    try {
        const result = await commandService.issueCommand(req.params.id, req.body);
        const transformedResult = getResponseTransformer(req.body.type).transform(req, result.payload);
        context.res = {
            headers: {
                'Content-Type': 'application/json'
            },
            status: result.status,
            body: transformedResult
        };
    } catch (err) {
        context.log.error(err);
        context.res = errorResponseBuilder.build(err);
    }
};