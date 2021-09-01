var express = require("express");
var session = require("express-session");
const bodyParser = require("body-parser");
const fs = require("fs");
const hostname = 'http://localhost:3001/';
var date = require("date-and-time");
var mysql = require("./libs/mysql.js");
var Functions = require("./libs/functions.js");
const flash = require('connect-flash');
// create server// 
const app = express();
const port = 3001
var server = require('http').createServer(app);
server.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
app.set('port', process.env.port || port);
// create server// 
// set view engine //
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static("views"));
// set view engine //
//set body parser//
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(flash());
// set session
app.use(session({
    secret: 'amndi5c&^*((*HJHJVHBH',
    resave: false,
    saveUninitialized: true
}));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});
app.use((err, req, res, next) => {
    log.error(err);
    log.error(err.stack);
    throw new Error(err);
    return res.status(err.statusCode || 500).send(err.message);
});
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/logs/log'+date.format(new Date(), 'YYYY-MM-DD')+'.log', {flags : 'a'});
var log_stderr = process.stderr;

console.log = function(d) {
  log_file.write(util.format(d) + '\n');
  log_stderr.write(util.format(d) + '\n');
};
try {
    let admin_routes = require('./routes/admin-routes');
    let api_routes = require('./routes/api-routes');
    app.use('/', admin_routes);
    app.use('/admin', admin_routes);
    app.use('/api', api_routes);
} catch (error) {
    console.log(error);
}
// define global variables //
global.base_url = hostname
global.db = mysql
global.fun = Functions;
// define global variables //