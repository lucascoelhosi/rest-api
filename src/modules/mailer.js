const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const { host, port, user, pass } = require('../config/mail');

const transport = nodemailer.createTransport({
    host,
    port,
    auth: { user, pass }
  });

transport.use('compile', hbs({
    viewEngine: {
      extName: '.html',
      partialsDir: path.resolve(__dirname, '..', 'resources', 'mail'),
      layoutsDir: path.resolve(__dirname, '..', 'resources', 'mail'),
      defaultLayout: null
    },
    viewPath: path.resolve(__dirname, '..', 'resources', 'mail'),
    extName: '.html',
}));

module.exports = transport;