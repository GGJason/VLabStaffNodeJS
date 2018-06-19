var config = require('./config.js')
var express = require('express')
var session = require('express-session')
var mysql = require('mysql')
var app = express();

app.use(require('morgan')());


var parser = require('body-parser')
app.use(parser.json())
app.use(parser.urlencoded())


var session = require('express-session')
var MySQLStore = require('express-mysql-session')(session);
var sessionStore = new MySQLStore(config.mysql);
app.use(session({
	secret : 's3Cur3',
	name : 'sessionId',
	store:sessionStore,
	cookie: {
	    maxAge: 10 * 1000
	}
}))

app.use('/', express.static(__dirname+'/public'))

var route = require('./router/defaultRouter')
route(app)


var con = mysql.createConnection(config.mysql)
con.connect(function(err){
	if (err){
		console.log('Database Connection Error');
		throw err;
	}
	console.log('Database Connection OK')
})


app.listen(config.port, function () {
  console.log('Example app listening on port '+config.port+'!')
});

