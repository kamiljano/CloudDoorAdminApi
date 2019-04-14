'use strict';

const storage = require('azure-storage');
const clientDocument = require('../constants').db.documents.clients;

const PARTITION_KEY = storage.TableUtilities.entityGenerator.String('eu');

module.exports.ClientRepository = class {

    constructor(connectionString) {
        this._db = storage.createTableService(connectionString);
    }

    insertClient({uuid, clientData}) {
        const entGen = storage.TableUtilities.entityGenerator;
        const entity = {
            PartitionKey: PARTITION_KEY,
            RowKey: entGen.String(uuid),
            created: entGen.DateTime(new Date()),
            os: entGen.String(clientData.os)
        };
        return new Promise((resolve, reject) => {
            try {
                this._db.insertEntity(clientDocument, entity, (error, result) => {
                    error ? reject(error) : resolve(result);
                });
            } catch (err) {
                reject(err);
            }
        });
    }
};