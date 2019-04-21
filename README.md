# About

CloudDoor is a minimalistic serverless CnC application based on Azure Functions and Azure IoT Hub.
The application allows to register new IoT devices, perform basic queries on them and issue remote operations.

# Endpoints

## Register

    GET /api/register

    Example output:

    {
        "connectionString": "HostName=**********;SharedAccessKey=**************",
        "deviceId": "****************"
    }

## Search for devices

    GET /api/findBots

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


# Install Dependencies

All dependencies can be installed with the simple command

```
npm install
```

# Deploy