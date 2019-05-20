'use strict';

const { getRegistry } = require('../../common/services/clients/iotRegistry');
const config = require('../../common/services/config');
const _ = require('lodash');

const DATE_NOT_AVAILABLE = '0001-01-01T00:00:00';

const getReg = () => getRegistry(config.getIotRegistryReadWriteConnectionString());

const objectToArray = obj => {
    if (!obj) {
        return [];
    }
    const result = [];
    _.each(obj, value => result.push(value));
    return result;
};

class BotDetails {

    constructor(data) {
        this.id = _.get(data, 'device.deviceId');
        this.lastConnected =  _.get(data, 'device.connectionStateUpdatedTime') === DATE_NOT_AVAILABLE ? undefined : data.device.connectionStateUpdatedTime;
        this.os = _.get(data, 'twin.properties.reported.os');
        this.currentUser = _.get(data, 'twin.properties.reported.currentUser');
        this.online = _.get(data, 'twin.connectionState') === 'Connected';
        this.cpus = objectToArray(_.get(data, 'twin.properties.reported.specs.cpus'));
    }
}

module.exports.findBot = async deviceId => {
    const deviceData = await getReg().get(deviceId);
    return new BotDetails(deviceData);
};