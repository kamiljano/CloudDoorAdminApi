'use strict';

const { IotRegistry } = require('./iotRegistry');
const config = require('../../common/services/config');
const uuid = require('uuid/v4');
const retry = require('../../common/utils/retry');

const iotRegister = deviceId => {
    const iotRegistry = new IotRegistry(config.getIotRegistryReadWriteConnectionString());
    return iotRegistry.create(deviceId);
};

module.exports.register = () => {
    return retry(() => {
        const deviceId = uuid();
        return iotRegister(deviceId);
    });
};