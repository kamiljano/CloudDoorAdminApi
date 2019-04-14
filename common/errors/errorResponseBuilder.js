'use strict';

const { HttpError } = require('./errors');

module.exports.build = error => {
    
    return error instanceof HttpError
        ? {
            status: error.status,
            body: error.body
        }
        : {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                error: 'Unexpected error occurred'
            }
        }
}