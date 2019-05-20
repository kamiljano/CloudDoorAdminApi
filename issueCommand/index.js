'use strict';

const commandService = require('./lib/commandService');
const {getResponseTransformer} = require('./lib/response/responseTransformerFactory');
const { endpoint } = require('../common/endpoint/endpoint');

module.exports = endpoint(async (context, req) => {
    context.log.verbose('Issuing a remote command' + JSON.stringify(req.body)); //TODO: validate body

    const result = await commandService.issueCommand(req.params.id, req.body);

    return {
        body: getResponseTransformer(req.body.type).transform(req, result.payload),
        status: result.status
    };
});