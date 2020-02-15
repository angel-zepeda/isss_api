'use strict';

const express = require('express');
const api = express.Router();
const pensioner3Controller = require('../controllers/pensioner3');
const multer = require('multer')({ dest: 'files/' });

api.get('/coordinador', pensioner3Controller.index);
api.post(
  '/coordinador',
  multer.array('files', 12),
  pensioner3Controller.create
);

module.exports = api;
