const express = require('express');
const routes = require('./routes');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/api', routes);


app.listen(PORT, '127.0.0.1');

console.log(`Escutando na porta: ${PORT}`);

