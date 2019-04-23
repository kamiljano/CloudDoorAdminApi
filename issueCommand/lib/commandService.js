'use strict';

const { Client } = require('azure-iothub');
const config = require('../../common/services/config');
const { BadRequestHttpError } = require('../../common/errors/errors');

module.exports.issueCommand = (deviceId, command) => {
    //TODO: the client should upload the data on what commands it supports and the request should vaildated against it,
    //so that you don't issue any request to the device if you know in advance that it cannot execute it
    return new Promise((resolve, reject) => {
        Client.fromConnectionString(config.getIotRegistryReadWriteConnectionString())
            .invokeDeviceMethod(deviceId, {
                methodName: command.type,
                payload: command.payload,
                responseTimeoutInSeconds: 30
            }, (err, result) => {
                err ? reject(err) : resolve(result);
            });
    });
};