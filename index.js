var express = require("express"),
	config = require(__dirname + "/backend/config/config"),
	app = express();

app.set("port", (process.env.PORT || config.port));

app.use(require(__dirname + "/backend/lib/cors")("*"));
app.use(require("body-parser")());
app.use(express.static(__dirname + "/"));
app.use(require(__dirname + "/backend/config/router")(express.Router()));

console.log("Server listening on port : ", config.port);
 
app.listen(app.get("port"), function() {
	console.log("Initializing PileAPP REST API at port", app.get("port"), ". ENV =", process.env["NODE_ENV"]);
});
