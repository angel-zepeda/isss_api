'use strict';

const express = require('express');
const api = express.Router();
const pensioner2Controller = require('../controllers/pensioner2');
const multer = require('multer')({ dest: 'files/' });

api.get('/integrador', pensioner2Controller.index);
api.post('/integrador', multer.array('files', 12), pensioner2Controller.create);
api.get('/integrador/show/:id', pensioner2Controller.show);

module.exports = api;