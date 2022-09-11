const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

require('./src/Routes/index')(app);

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(3333, () => {
    console.log('Server started at: http://localhost:3333');
});