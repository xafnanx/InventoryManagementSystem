const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cookieParser = require('cookie-parser');

const Handlebars = require("handlebars");

require('dotenv').config();

const app = express();

app.listen(process.env.PORT, () => {
    console.log('Server started on port ' + process.env.PORT)
})

//Parsing middleware
//Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//Parse application/jason
app.use(bodyParser.json());

//Static files
app.use(express.static('public'));

//Templating Engine
app.engine('hbs', exphbs.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');

const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

//connect to db
pool.getConnection((err, connection) => {
    if (err) throw err;
    else console.log('connected as ID ' + connection.threadId);
})

//Define Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.use('/storage', require('./routes/storage'))


Handlebars.registerHelper('isEqual', function (value1, value2) {
    return value1 == value2;
});

