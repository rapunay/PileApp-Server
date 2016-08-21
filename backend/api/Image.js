var fs = require("fs");

exports.upload = function(req, res, next){
	var file = req.files.file;
    
	fs.readFile(file.path, function(err, data){
		if(err){
			return res.status(500).send(err);
		}else{			
			var fileData = {
				"base64": new Buffer(data).toString("base64")
			}
			fs.unlink(req.files.file.path);
			return res.status(200).send(fileData);
		}
	});
};
