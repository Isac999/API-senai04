const http = require('http');
const port = process.env.PORT || 3030;
const app = require('./app');

//require('./src/Routes/index')(app);
const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server started at: http://localhost:${port}`);
});