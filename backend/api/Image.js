var fs = require("fs"),
	imagesDir = __dirname + "/../uploads/images/";

exports.upload = function(req, res, next){
	var filename = req.body.filename,
    	dirname = req.body.dirname,
    	file = req.files.file;
    
	fs.readFile(file.path, function(err, data){
		if(err){
			return res.status(500).send(err);
		}else{
			fs.writeFile([imagesDir, dirname, "/", filename].join(""), data, function(err){
				if(err){
					return res.status(500).send(err);
				}
				var fileData = {
					"base64": new Buffer(data).toString("base64")
				}
				fs.unlink(req.files.file.path);
				return res.status(200).send(fileData);
			});
		}
	});
};

exports.retrieve = function(req, res, next){
	var dirname = req.params.dirname,
    	filename = req.params.filename;
    
	fs.readFile([imagesDir, dirname, "/", filename].join(""), function(err, data){
		if(err){
			return res.status(500).send(err);
		}else{
			var fileData = {
				"base64": new Buffer(data).toString("base64")
			}
			return res.status(200).send(fileData);
		}
	});
};
