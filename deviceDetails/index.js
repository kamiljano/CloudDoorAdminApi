'use strict';

const botDetailsService = require('./lib/botDetailsService');
const { endpoint } = require('../common/endpoint/endpoint');

module.exports = endpoint(async (context, req) => {
    return {
        body: await botDetailsService.findBot(req.params.id)
    };
});