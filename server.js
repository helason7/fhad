const express = require('express');

const bodyParser = require('body-parser');

//create express app

const app = express();

//setup server port

const port = process.env.PORT || 4000;

//parse requests of content-type - application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({ extended: true }))

//parse request of content-type - application/json

app.use(bodyParser.json())

// configurating the database 
const dbConfig = require('./config/db.config.js');

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//connecting to the database

mongoose.connect(dbConfig.url, {
	
	useNewURLParser: true

}).then(() => {

	console.log("Succesfully connceted to the database");

}).catch(err => {

	console.log("Could not connect to the database.", err);

	process.exit();

});

//define a root/default route

app.get('/', (req, res) => {

	res.sendfile('./public/views/index.html');

});

//require user routes

const userRoutes = require('./src/routes/user.routes')

// using as middleware

app.use('/api/users', userRoutes)

const auth = require('./middleware/check-auth');


//listen for requests

app.listen(port, () => {

	console.log(`Node server is listening on port ${port}`);

});