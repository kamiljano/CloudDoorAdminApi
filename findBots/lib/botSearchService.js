'use strict';

const { getRegistry } = require('../../common/services/clients/iotRegistry');
const config = require('../../common/services/config');
const _ = require('lodash');

const getReg = () => getRegistry(config.getIotRegistryReadWriteConnectionString());

class Bot {

    constructor(data) {
        this.id = data.deviceId;
        this.os = _.get(data, 'properties.reported.os');
        this.currentUser = _.get(data, 'properties.reported.currentUser');
    }
}

module.exports.findConnectedBots = async () => {
    const deviceData = await getReg().query('SELECT * FROM devices WHERE connectionState = \'Connected\'');
    return deviceData.map(data => new Bot(data));
};