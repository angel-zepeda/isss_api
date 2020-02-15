const express = require('express');
const api = express.Router();
const filesController = require('../controllers/files');

api.post('/deleteFile/:name', filesController.deleteFiles);

module.exports = api;
