const express = require('express');
const api = express.Router();
const searchController = require('../controllers/search');

api.post('/search', searchController.search);
api.post('/search2', searchController.search2);

module.exports = api;
