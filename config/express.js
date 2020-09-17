const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// global settings for app
module.exports = function (app) {
  app.use(bodyParser.json());
  // Enables CORS
  app.use(cors());
}