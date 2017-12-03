const ApiError = require('../util/apiError');
const errorHandler = (err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).send(err);
    }
    return res.status(500).send(err);
};

module.exports = errorHandler;