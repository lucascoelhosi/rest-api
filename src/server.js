const express = require('express');
const cors = require('cors');
const routes = require('./routes');

require('./database');

const app = express();

/*
* Para aplicação em servidor 
* cors({ origin: 'http://www.meuapp.com' })
*/
app.use(cors());

app.use(express.json());

app.use(routes);

app.listen(3333, () => {
    console.log('Server Runing on localhost:3333');
});