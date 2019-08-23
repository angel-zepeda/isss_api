'use strict'

const express = require('express');
const api = express.Router();
const userController = require('../controllers/user');
const md_auth = require('../middlewares/authenticated');

// RUTAS DE LOGIN
api.get('/users/index', userController.index);
api.post('/user/register', userController.create);
api.post('/user/login', userController.loginUser);
api.get('/user/:id', md_auth.ensureAuth, userController.getUser);
api.put('/user/update/:id', md_auth.ensureAuth, userController.update);

module.exports = api;
