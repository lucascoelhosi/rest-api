const express = require('express');

const UserController = require('./app/controllers/UserController');
const AdressController = require('./app/controllers/AdressController');
const TechController = require('./app/controllers/TechController');
const ReportController = require('./app/controllers/ReportController');

const routes = express.Router();

routes.get('/users', UserController.index);
routes.post('/users/new', UserController.store);

routes.get('/users/:user_id/adresses', AdressController.index);
routes.post('/users/:user_id/adresses/new', AdressController.store);

routes.get('/users/:user_id/techs', TechController.index);
routes.post('/users/:user_id/techs/new', TechController.store);
routes.delete('/users/:user_id/techs/delete', TechController.delete);

routes.get('/report', ReportController.show);

module.exports = routes;