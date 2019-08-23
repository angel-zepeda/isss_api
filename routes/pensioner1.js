'use strict'

const express = require('express');
const api = express.Router();
const pensioner1Controller = require('../controllers/pensioner1');
var multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'files/')
  },
  filename: function (req, file, cb) {
    // cb(null, Date.now() + file.originalname)
    cb(null, file.originalname)
  }
})
multer = multer({ storage });

api.get('/secretaria', pensioner1Controller.index);
api.post('/secretaria', pensioner1Controller.create);
api.delete('/secretaria/:id', pensioner1Controller.deletePensioner1);
api.put('/secretaria/:id', pensioner1Controller.updatePensioner1);
api.get('/secretaria/:id', pensioner1Controller.show);
api.post('/files', multer.array('files', 8), pensioner1Controller.index);
module.exports = api;
