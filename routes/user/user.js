'use strict';
const ApiError = require('../../util/apiError');
const HttpStatus = require('http-status-codes');
const userController = require('../../controller/userController');

class TokenApi {
    static getToken(req, res, next) {
        const secret = req.app.get('secret');
        const { username, password, refreshToken } = req.body;
        
        if (!password && refreshToken && username) {
          return next();
        }

        if (!username || !password) {
          return next(new ApiError(
            HttpStatus.getStatusText(HttpStatus.UNPROCESSABLE_ENTITY),
            'Username and Password Required',
            null,
            HttpStatus.UNPROCESSABLE_ENTITY
          ));
        }

        return userController.validateUser(username, password)
          .then(result => {
            const payload = {
              username,
              role: 'admin',
              private: 'some Private Info'
            }
            return userController.createAccessToken(payload, secret)
              .then(token => {
                return res.json({
                  access_token: token
                })
              });
          })
          .catch(err => {
            return next(new ApiError(
              HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED),
              "Error while Validating user",
              err,
              HttpStatus.UNAUTHORIZED
            ));
          })
    }

    static generateRefreshToken(req, res, next) {
        const { username, password } = req.body;
        
        return userController.validateUser(username, password)
          .then(userController.createRefreshToken)
          .then(token => {
            return res.json({
              refresh_token: token
            });
          })
          .catch(err => {
            return next(new ApiError(
              HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED),
              "Error while generating refresh token",
              err,
              HttpStatus.UNAUTHORIZED
            ))
          })
    }

    static revokeToken(req, res, next) {
        const { refreshToken } = req.body;
        
        return userController.revokeRefreshToken(refreshToken)
          .then(result => {
            res.json({
              message: result
            })
          })
          .catch(err => {
            return next(new ApiError(
              HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
              'Error while revoking refresh token',
              err,
              HttpStatus.INTERNAL_SERVER_ERROR
            ));
          })
    }

    static getResource(req, res, next) {
      return res.json({
        message: 'Protected Resource Success'
      });
    }

    static getAccessTokenFromRefreshToken(req, res, next) {

      const secret = req.app.get('secret');
      const { username, refreshToken } = req.body;
        
      const params = {
        refreshToken,
        payload: {
          username,
          role: 'admin',
          private: 'some Private Info'
        },
        secret,
      }
      return userController.validateAndGetAccessToken(params)
        .then(token => {
          res.json({
            access_token: token
          })
        })
        .catch(err => {
          return next(new ApiError(
            HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED),
            "Invalid token",
            err,
            HttpStatus.UNAUTHORIZED
          ))
        })

    }
}

module.exports = TokenApi;