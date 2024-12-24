class ApiError extends Error {
    constructor(status, message) {
        super(message); 
        this.status = status;
        this.isOperational = true; 
    }

    static badRequest(message) {
        return new ApiError(400, message); 
    }

    static internal(message) {
        return new ApiError(500, message);
    }

    static forbidden(message) {
        return new ApiError(403, message);
    }

    static unauthorized(message) {
        return new ApiError(401, message); 
    }

    static success(message) {
        return new ApiError(200, message);
    }

    static created(message) {
        return new ApiError(201, message);
    }
}

module.exports = ApiError;