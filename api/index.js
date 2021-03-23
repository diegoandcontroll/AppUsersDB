const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const app = express();

app.use(bodyParser.urlencoded({ extended: false, limit: '30mb' }));
app.use(bodyParser.json({limit: '30mb'}));
app.use(expressValidator());

consign().include('routes').include('utils').into(app);

app.listen(4000, '127.0.0.1', ()=>{

    console.log('servidor rodando!');

});
