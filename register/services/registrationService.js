'use strict';

const { getRegistry } = require('../../common/services/clients/iotRegistry');
const config = require('../../common/services/config');
const uuid = require('uuid/v4');
const retry = require('../../common/utils/retry');

const iotRegister = deviceId => {
    return getRegistry(config.getIotRegistryReadWriteConnectionString())
        .create(deviceId);
};

module.exports.register = () => {
    return retry(() => {
        const deviceId = uuid();
        return iotRegister(deviceId);
    });
};