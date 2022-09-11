const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const CustomersRoute = require('./src/Routes/CustomersRoute');
app.use('/customers', CustomersRoute);

module.exports = app;

/*
app.use('/api', (req, res, next) => {
    res.status(200).send({
        "mensagem": 'Tudo OK'
    });
})
*/