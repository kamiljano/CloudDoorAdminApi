'use strict';

const iothub = require('azure-iothub');

const singletonHolder = {};

class IotRegistry {

    constructor(connectionString) {
        this._registry = iothub.Registry.fromConnectionString(connectionString);
    }

    async get(deviceId) {
        const [device, twin] = await Promise.all([
            this._registry.get(deviceId),
            this._registry.getTwin(deviceId)
        ]);
        return {
            device: device.responseBody,
            twin: twin.responseBody
        };
    }

    /**
     * 
     * @param {*} SQL query for a device 
     * @param {*} limit pageSize, max 100
     */
    async query(sql, limit = 100) {
        const query = this._registry.createQuery(sql, limit);
        return (await query.nextAsTwin()).result;
    }
};

module.exports.getRegistry = connectionString =>  {
    if (!singletonHolder[connectionString]) {
        singletonHolder[connectionString] = new IotRegistry(connectionString);
    }
    return singletonHolder[connectionString];
};