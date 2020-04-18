const express = require('express');

const UserController = require('./app/controllers/UserController');
const AdressController = require('./app/controllers/AdressController');

const routes = express.Router();

routes.get('/users', UserController.index);
routes.post('/users/new', UserController.store);

routes.get('/users/:user_id/adresses', AdressController.index);
routes.post('/users/:user_id/adresses/new', AdressController.store);

module.exports = routes;