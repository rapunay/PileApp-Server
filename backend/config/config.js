var path = require("path"),
	config = {
		development: {
			env: "development",
			port: 5000,
			db: {
				host	: "",
				port	: 3306,
				name	: "",
				user	: "",
				pass	: ""
			}
		},
		production: {
			env: "production",
			port: 5000,
			db: {
				host	: "",
				port	: 3306,
				name	: "",
				user	: "",
				pass	: ""
			}
		}
	};


// set development as default environment
!process.env["NODE_ENV"] && (process.env["NODE_ENV"] = "development");
config = config[process.env["NODE_ENV"]];

module.exports = config;
