'use strict';

const express = require('express');
const path = require('path');
const log = require('debug')('vp:server:boot:90-default-content');

module.exports = function(server) {
  // Install a `/api` route that returns server status
  var router = server.loopback.Router();
  router.get('/api', server.loopback.status());

  // Install web client, could also be served statically
  var webRoot =  path.resolve(process.env.WEB_ROOT || "./client/somethingfront/dist/somethingfront");
  log('Serving static files from ' + webRoot);
  router.use('/', express.static(webRoot, { maxage: process.env.CACHE_WEB ? process.env.CACHE_WEB : 0, }));
  
  // server.on('started', function () {
	 //  server.use('*', function (req, res) {
	 //  	res.redirect('/#!404.html');
	 //  });
  // });


  server.use(router);
};
