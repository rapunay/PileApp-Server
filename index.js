var express = require("express"),
	app = express();

app.set("port", 5000);

app.use(require(__dirname + "/backend/lib/cors")("*"));
app.use(require("body-parser")());
app.use(express.static(__dirname + "/"));
app.use(require(__dirname + "/backend/config/router")(express.Router()));

app.listen(app.get("port"), function() {
	console.log("Initializing PileAPP REST API at port", app.get("port"), ".");
});
