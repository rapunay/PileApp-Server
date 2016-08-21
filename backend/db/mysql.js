var mysql = require("mysql");

db= mysql.createConnection(process.env.JAWSDB_URL);
	
/*
db = mysql.createConnection({
	host     : config.host,
	user     : config.user,
	password : config.pass,
	database : config.name
});
*/

db.connect();
module.exports = db;