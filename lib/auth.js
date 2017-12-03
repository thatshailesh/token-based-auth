'use strict';
const jwt = require('jsonwebtoken');
const config = require('../routes/common').env;

class Auth {
    static validateUser(username, password) {
        //Proper validation should be done using hashed password
        if (username === 'shailesh' && password === 'coolestApp') {
            return Promise.resolve(username);
        }
        return Promise.reject('Invalid Username and Password');
    }

    static createToken(payload, secret) {
        if (!payload || !secret) {
            throw new Error('Invalid arguments passed');
        }
        return new Promise((resolve, reject) => {
            jwt.sign(payload, secret, 
                {
                    expiresIn: config.accessTokenExpiresIn,
                    algorithm: 'HS256'
                }, (err, token) => {
                    if (err) {
                        reject(err);
                    }else {
                        resolve(token);
                    }
            });
        });
    }

    static verifyToken(token, secret) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, secret, (err, decoded) => {
                if (!err) {
                    console.log("Token verified", decoded);
            
                    resolve();
                  }else {
                    reject(err);
                  }
            })
        })
    }
}

module.exports = Auth;