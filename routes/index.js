const express = require('express');
const router = express.Router();
const userApi = require('./user/user');
const mwAuth = require('../middleware/mwAuth');
const accessTokenRoute = router.route('/token');
const refreshTokenRoute = router.route('/token/generate');
const revokeTokenRoute = router.route('/token/revoke');
const protectedRoute = router.route('/about');

accessTokenRoute
    .post(userApi.getToken.bind(userApi))
    .post(userApi.getAccessTokenFromRefreshToken.bind(userApi))
  
refreshTokenRoute
    .post(userApi.generateRefreshToken.bind(userApi));
  
revokeTokenRoute
    .post(userApi.revokeToken.bind(userApi));

protectedRoute
    .post(mwAuth)
    .post(userApi.getResource.bind(userApi))

module.exports = router;