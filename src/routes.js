const express = require('express');

const authMiddleware = require('./app/middlewares/auth');

const UserController = require('./app/controllers/UserController');
const AdressController = require('./app/controllers/AdressController');
const TechController = require('./app/controllers/TechController');
const ReportController = require('./app/controllers/ReportController');
const AuthController = require('./app/controllers/AuthController');
const ProjectController = require('./app/controllers/ProjectController');
const TaskController = require('./app/controllers/TaskController');
const UserTaskController = require('./app/controllers/UserTaskController');

const routes = express.Router();

routes.get('/users', authMiddleware, UserController.index);
routes.post('/users/register', UserController.store);

routes.post('/users/auth', AuthController.auth);
routes.post('/users/forgot_password', AuthController.forgot);
routes.post('/users/reset_password', AuthController.reset);

routes.get('/users/:user_id/adresses', authMiddleware, AdressController.index);
routes.post('/users/:user_id/adresses/new', AdressController.store);

routes.get('/users/:user_id/techs', TechController.index);
routes.post('/users/:user_id/techs/new', TechController.store);
routes.delete('/users/:user_id/techs/delete', TechController.delete);

routes.get('/projects', authMiddleware, ProjectController.index);
routes.get('/projects/show', authMiddleware, ProjectController.show);
routes.post('/projects/new', authMiddleware, ProjectController.store);

routes.get('/tasks', authMiddleware, TaskController.index);
routes.get('/tasks/show', authMiddleware, TaskController.show);
routes.post('/tasks/new', authMiddleware, TaskController.store);
routes.post('/tasks/user/new', authMiddleware, UserTaskController.store);
routes.delete('/tasks/user/remove', authMiddleware, UserTaskController.delete);

routes.get('/report', ReportController.show);

module.exports = routes;