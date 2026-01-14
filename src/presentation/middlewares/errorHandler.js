// src/presentation/middlewares/errorHandler.js
function errorHandler(err, req, res, next) {
    console.error('Error:', err.message);

    let statusCode = 500;
    let message = err.message || 'Internal server error';

    // Handle known error types
    switch (err.name) {
        case 'ValidationError':
            statusCode = 400;
            break;

        case 'NotFoundError':
            statusCode = 404;
            break;

        case 'ConflictError':
            statusCode = 409;
            break;

        default:
            statusCode = err.statusCode || 500;
    }

    res.status(statusCode).json({
        success: false,
        error: message
    });
}

module.exports = errorHandler;
