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
        this.online = data.connectionState === 'Connected';
    }
}

module.exports.findBots = async params => {
    const deviceData = await getReg().query(buildQuery(params));
    return deviceData.map(data => new Bot(data));
};

const buildQuery = params => {
    const where = [];
    if (params.online) {
        where.push('connectionState = \'Connected\'');
    }
    let query = 'SELECT * FROM devices';
    if (where.length) {
        query += ' WHERE ' + where.join(' AND ');
    }
    return query;
}