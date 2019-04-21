'use strict';

const { MisconfigurationError } = require('../errors/errors');

const getEnv = param => {
    const result = process.env[param];
    if (!result) {
        throw new MisconfigurationError(`Expected to find the environment variable ${param}, but nothing was found`);
    }
    return result;
};

module.exports = {
    getIotRegistryReadWriteConnectionString: () => getEnv('IOT_REGISTRY_READ_WRITE_CONNECTION_STRING')
};