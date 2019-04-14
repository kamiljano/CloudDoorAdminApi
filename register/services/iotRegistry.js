'use strict';

const iothub = require('azure-iothub');

const generateConnectionString = (deviceInfo, hub) => {
    return `HostName=${hub}.azure-devices.net;DeviceId=${deviceInfo.deviceId};SharedAccessKey=${deviceInfo.authentication.symmetricKey.primaryKey}`;
};

class IotDevice {

    constructor({connectionString}) {
        this.connectionString = connectionString;
    }

}

module.exports.IotRegistry = class {

    constructor(connectionString) {
        this._registry = iothub.Registry.fromConnectionString(connectionString);
    }

    create(deviceId) {
        return new Promise((resolve, reject) => {
            this._registry.create({deviceId}, (err, deviceInfo) => {
                err ? reject(err) : resolve(new IotDevice({
                    connectionString: generateConnectionString(deviceInfo, this._registry._restApiClient._config.host)
                }));
            });
        });
    }
};