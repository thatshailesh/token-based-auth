'use strict';

const jwt = require('jsonwebtoken');
const ApiError = require('../util/apiError');
const HttpStatus = require('http-status-codes');
const auth = require("../lib/auth");

const authenticate = (req, res, next) => {
    // check header or url parameters or post parameters for token
    let token = req.body.token || req.params.token || req.headers['x-access-token'];

    if (!token && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        token = req.headers.authorization.split(' ')[1];
    }else if (!token && req.query && req.query.token) {
        token = req.query.token;
    }

    //decode token

    if (token) {
        const secret = req.app.get("secret");
        return auth.verifyToken(token, secret)
            .then(result => {
                return next();
            })
            .catch(err => {
                return next(new ApiError(
                    HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED),
                    "Failed to Authenticate",
                    err,
                    HttpStatus.UNAUTHORIZED
                  ));
            });
    }
    return next(new ApiError(
        HttpStatus.getStatusText(HttpStatus.FORBIDDEN),
        "Not Allowed",
        {"inner": {
            "message": "No authorization token was found"
        }},
        HttpStatus.FORBIDDEN
    ));
}

module.exports = authenticate;