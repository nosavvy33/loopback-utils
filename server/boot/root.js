'use strict';
const path = require('path');
const express = require('express');

module.exports = function(server) {
  // Install a `/api` route that returns server status
  var router = server.loopback.Router();
  router.get('/api', server.loopback.status());
  // Install web client, could also be served statically
  var webRoot =  path.resolve(process.env.WEB_ROOT || "./client/somethingfront/dist/somethingfront");
  router.use('/', express.static(webRoot, { maxage: process.env.CACHE_WEB ? process.env.CACHE_WEB : 0, }));
  server.use(router);
};
