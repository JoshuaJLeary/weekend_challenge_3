const express = require('express');
const app = express();
const PORT = 4003;
const bodyParser = require('body-parser');

//Configure body-parser for Angular and jQuery
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//Routes
const toDoRouter = require('./routes/todolist.router.js');

//Mongoose code
const mongoose = require('mongoose');
const databaseUrl = 'mongodb://localhost:27017/hadar';

//connect to DB
mongoose.connect(databaseUrl);
mongoose.connection.on('connected', () => {
    console.log('mongoose connected to the mongod');
});

mongoose.connection.on('error', (err) => {
    console.log('Error connecting to the mongod', err);
});
//End mongoose code

//All traffic will use this route to todolist.router.js
app.use('/todo', toDoRouter);

//Static files
app.use(express.static('server/public'));

//Start listening for requests on a specific port
app.listen(PORT, () => {
    console.log('listening on port', PORT);
});