'use strict';

const iothub = require('azure-iothub');

const generateConnectionString = (deviceInfo, hub) => {
    return `HostName=${hub};SharedAccessKey=${deviceInfo.authentication.symmetricKey.primaryKey}`;
};

const singletonHolder = {};

class IotDevice {

    constructor({connectionString, deviceId}) {
        this.connectionString = connectionString;
        this.deviceId = deviceId;
    }

}

class IotRegistry {

    constructor(connectionString) {
        this._registry = iothub.Registry.fromConnectionString(connectionString);
    }

    create(deviceId) {
        return new Promise((resolve, reject) => {
            this._registry.create({deviceId}, (err, deviceInfo) => {
                err ? reject(err) : resolve(new IotDevice({
                    connectionString: generateConnectionString(deviceInfo, this._registry._restApiClient._config.host),
                    deviceId: deviceInfo.deviceId
                }));
            });
        });
    }

    /**
     * 
     * @param {*} SQL query for a device 
     * @param {*} limit pageSize, max 100
     */
    query(sql, limit = 100) {
        return new Promise((resolve, reject) => {
            const query = this._registry.createQuery(sql, limit);
            query.nextAsTwin((err, results) => {
                err ? reject(err) : resolve(results);
            });
        });
    }
};

module.exports.getRegistry = connectionString =>  {
    if (!singletonHolder[connectionString]) {
        singletonHolder[connectionString] = new IotRegistry(connectionString);
    }
    return singletonHolder[connectionString];
};