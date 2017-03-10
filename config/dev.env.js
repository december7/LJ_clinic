var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_URL: '"http://rap.linjiahaoyi.com/mockjsdata/1"',
  API_URL: '"http://test.rolinzs.com/clinic"',
})
