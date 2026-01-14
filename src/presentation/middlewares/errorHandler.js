// src/presentation/middlewares/errorHandler.js
function errorHandler(err, req, res, next) {
    console.error('Error:', err.message);

    let statusCode = 500;

    // Handle different error types
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
            statusCode = 500;
    }

    res.status(statusCode).json({
        error: err.message || 'Internal server error'
    });
}

module.exports = errorHandler;
