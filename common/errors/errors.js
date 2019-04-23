'use strict';

class HttpError {
    constructor(status, body) {
        this.status = status;
        this.body = body;
    }
}

class InternalHttpError extends HttpError {
    constructor(data) {
        super(500, { error: 'Internal application error' });
        this.data = data;
    }
}

class BadRequestHttpError extends HttpError {
    constructor(message) {
        super(400, {error: message});
    }
}

class MisconfigurationError extends InternalHttpError {

    constructor(message) {
        super(message);
    }
}

module.exports = {HttpError, InternalHttpError, BadRequestHttpError, MisconfigurationError};