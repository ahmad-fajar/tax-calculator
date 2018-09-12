'use strict'


/**
 * db configration for use with
 * docker built with provided
 * Dockerfile and docker-compose
 */
/*
exports.dbCfg = {
  user: "postgres",
  host: "db",
  database: "shopee",
  password: "postgres",
  port: 5432,
  statement_timeout: 1000
};
*/


/**
 * edit following block to match
 * your postgres connection configuration.
 */
exports.dbCfg = {
  user: "postgres",
  host: "db",
  database: "shopee",
  password: "postgres",
  port: 5432,
  statement_timeout: 1000
};
