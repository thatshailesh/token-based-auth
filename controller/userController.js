'use strict';
const randtoken = require('rand-token') 
const redisClient = require('../util/redis-client');
const auth = require('../lib/auth');
const config = require('../routes/common').env;

class UserController {
    static getTokenFromCache(refreshToken) {
        console.log('UserController.getTokenFromCache(): info');

        return new Promise((resolve, reject) => {
            redisClient.get(refreshToken, (err, value) => {
                if (err) {
                    console.log('UserController.getTokenFromCache(): error, Error Occurred');
                    reject(err)
                }else {
                    console.log('UserController.getTokenFromCache(): debug, Success');
                    resolve(value);
                }
            })
        });
    }

    static createAccessToken(payload, secret) {
        console.log('UserController.createAccessToken(): info');

        return auth.createToken(payload, secret);
    }

    static createRefreshToken(username) {
        console.log('UserController.createRefreshToken(): info');

        const refreshToken = randtoken.uid(256);
        const ttl = config.refreshtokenExpiresIn;

        return new Promise((resolve, reject) => {
            redisClient.set(refreshToken, username, (err, result) => {
                if (!err) {
                  console.log('UserController.createRefreshToken(): debug, Success');
                  redisClient.expire(refreshToken, ttl);
                  resolve(refreshToken);
                }else {
                  console.log('UserController.createRefreshToken(): error, Error Occurred ', err);
                  reject(err);
                }
              })
        });
    }

    static revokeRefreshToken(refreshToken) {
        console.log('UserController.revokeRefreshToken(): info');

        return new Promise((resolve, reject) => {
            redisClient.del(refreshToken, (err, result) => {
                if (!err) {
                  console.log('UserController.revokeRefreshToken(): debug, Success ');
                  resolve("Successfully revoked")
                } else {
                  console.log('UserController.revokeRefreshToken(): error, Error Occurred ', err);
                  reject(err);
                }
              });
        });
    }

    static validateUser(username, password) {
        console.log('UserController.validateUser(): info');

        return auth.validateUser(username, password);
    }

    static validateAndGetAccessToken(args) {
        console.log('UserController.validateAndGetAccessToken(): info');

        const { refreshToken, payload, secret } = args;
        const { username } = payload;

        return UserController.getTokenFromCache(refreshToken)
            .then(value => {
                if (value === username) {
                    return UserController.createAccessToken(payload, secret)
                }
                console.log('UserController.validateAndGetAccessToken(): debug');

                return Promise.reject('Invalid Token or Token Expired');
            });
    }
}

module.exports = UserController;