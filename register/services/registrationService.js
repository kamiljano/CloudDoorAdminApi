'use strict';

const { IotRegistry } = require('./iotRegistry');
const config = require('../../common/services/config');
const uuid = require('uuid/v4');
const { ClientRepository } = require('../../common/services/clients/clientRepository');

const iotRegister = deviceId => {
    const iotRegistry = new IotRegistry(config.getIotRegistryReadWriteConnectionString());
    return iotRegistry.create(deviceId);
};

const dbRegister = (uuid, deviceData) => {
    const repo = new ClientRepository(config.getCosmosDbConnectionString());
    return repo.insertClient({uuid, clientData: deviceData});
};

module.exports.register = async deviceData => {
    const deviceId = uuid();
    const device = await iotRegister(deviceId);
    await dbRegister(deviceId, deviceData);
    return device;
};