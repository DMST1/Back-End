const knex = require('knex');

const knexConfig = require('../knexfile.js');

const envirionment = process.env.NODE_ENV || 'development'
module.exports = knex(knexConfig[envirionment]);
