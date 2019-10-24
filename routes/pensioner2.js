'use strict';

const express = require('express');
const api = express.Router();
const pensioner2Controller = require('../controllers/pensioner2');
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

api.get('/integrador', pensioner2Controller.index);
api.post('/integrador', multer.array('files', 12), pensioner2Controller.create);
api.get('/integrador/show/:id', pensioner2Controller.show);

module.exports = api;