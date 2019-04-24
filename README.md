# About

CloudDoor is a minimalistic serverless CnC application based on Azure Functions and Azure IoT Hub.
The application allows to register new IoT devices, perform basic queries on them and issue remote operations.

# TODO

* Store the device creation date (might require parsing the IoT Hub event)
* make sure that the functions are deployed along with the template
* Figure out the authentication for everything except for the registration function
* Create an endpoint for issuing the new commands
* Add automatic client version updates
* Make sure that the admin api of the IoT Hub can only be accessed from the cloud. Might need to put it into some vNet or something

# Endpoints

## Register

    PUT /api/bots

    No Body

    Example output:

    {
        "connectionString": "HostName=**********;SharedAccessKey=**************",
        "deviceId": "****************"
    }

## Search for devices

    GET /api/bots

    Example output:

    [
        {
            "id": "c12535a0-a673-4510-8bbc-c1b3bb80281f",
            "os": {
                "version": "Microsoft Windows NT 6.2.9200.0",
                "type": "Win32NT"
            },
            "currentUser": "DF\\janoka"
        }
    ]

## Issue a command

    POST /api/bots/:botId/command

### List Drives

    Request Body:

    {
        "type": "driveList"
    }

    Example Response:

    {
        "drives": [
            {
                "name": "C:\\"
            }
        ]
    }

### List Directories

    Request Body:

    {
        "type": "dirList",
        "payload": {
            "path": "C:"
        }
    }

    Example Response:

    {
        "files": [
            {
                "name": "data",
                "type": "DIR"
            },
            {
                "name": "postgresql_84.exe",
                "type": "FILE"
            }
        ]
    }

# Install Dependencies

All dependencies can be installed with the simple command

```
npm install -g azure-functions-core-tools
npm install
```

# Deploy

## The hard, but detailed way

1. Create a resource group - `az group create --name CloudDoorDevResourceGroup --location northeurope`
2. Deploy the resources - `az group deployment create --resource-group CloudDoorDevResourceGroup --template-file "./azuredeploy.json"`.
Optional parameters for the command:

    IoT related:

    * `--skuName` - IoT Hub's SKU name. By default it's 'F1' (free IoT Hub)
    * `--capacityUnits` - IoT Hub's capacity units. By default 1

# Debug locally

Once all resources are deployed, you can fetch the remote settings with `func azure functionapp fetch-app-settings CloudDoor`.
This will pre-configure the `local.settings.json` with all the necessary data to hook your local instance to the remotely hosted IoT Hub and
all other resources that are necessary for a smooth local run.

Once you have your `local.settings.json` in place, run the local server with `func start`