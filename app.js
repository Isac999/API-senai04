const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

//app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const CustomersRoute = require('./src/Routes/CustomersRoute');
const ProductsRoute = require('./src/Routes/ProductsRoute');
const PurchasesRouter = require('./src/Routes/PurchasesRouter');

app.use('/customers', CustomersRoute);
app.use('/products', ProductsRoute);
app.use('/purchases', PurchasesRouter);

app.use('/', (req, res, next) => {
    res.status(200).send({
        "API say's ": 'Welcome to API!',
        "Your options": ["/customers", "/products", "/purchases"]
    });
    next();
});

app.use((req, res, next) => {
    const error = new Error('Page not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        error: {
            "mensagem": error.message
        }
    });
});

module.exports = app;