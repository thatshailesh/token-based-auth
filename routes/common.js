const env = require('../env.json');
const node_env = process.env.NODE_ENV || 'development';

module.exports = {
    env: env[node_env]
}
