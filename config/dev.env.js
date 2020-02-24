/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date:2020-02-24 10:13:35
 * @LastEditTime: 2020-02-24 10:13:35
 * @LastEditors: zml
 */
'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"',
  BASE_API: '"http://192.168.5.134:8050"'
})
