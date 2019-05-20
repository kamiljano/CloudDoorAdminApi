'use strict';

const errorResponseBuilder = require('../errors/errorResponseBuilder');

module.exports.endpoint = controller => {
    return async (context, req) => {
        try {
            const result = await controller(context, req);
            context.res = {
                headers: {
                    'Content-Type': 'application/json'
                },
                status: result.status || 200,
                body: result.body
            };
        } catch (err) {
            context.log.error(err);
            context.res = errorResponseBuilder.build(err);
        }
    }
};