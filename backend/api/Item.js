var mkdirp = require("mkdirp"),
	fs = require("fs"),
	path = __dirname + "/../database/",
	db = path + "item.json",
	errorMap = {
		req_param: {errorCode: 1,
					text: "Missing required parameter"},
		dup_item: {errorCode: 2,
					text: "Duplicate item"}
	};

exports.insert = function(req, res){
	var item = req.body;
	
	if(!item.id || !item.name){
		return res.status(412).send(errorMap["req_param"]);
	}
	
	accessData(function(data){
		if(getOne("id", item.id, data)){
			return res.status(412).send(errorMap["dup_item"]);
		}
		
		data.push(item);
		
		storeData(data, function(err){
			if(err){
				return res.status(500).send(err);
			}
			res.status(200).send(item);
		});
	},function(err){
		storeData([item], function(err){
			if(err){
				return res.status(500).send(err);
			}
			res.status(200).send(item);
		});
	});
};

exports.remove = function(req, res){
	accessData(function(itemList){
		for(var i=0; i<itemList.length; i++){
			if(itemList[i].id == req.params.id){
				var removedItem = itemList.splice(i, 1);
			
				storeData(itemList, function(err){
					if(err){
						return res.status(500).send(err);
					}
					return res.status(200).send(removedItem[0]);
				});
			}
		}
	},function(err){
		return res.status(500).send(err);
	});
};

exports.update = function(req, res){
	var item = req.body;
	
	if(!item.id || !item.name){
		return res.status(412).send(errorMap["req_param"]);
	}
	accessData(function(itemList){	
		for(var i=0; i<itemList.length; i++){
			if(itemList[i].id == item.id){
				itemList[i] = item;
				storeData(itemList, function(err){
					if (err) {
						return res.status(500).send(err);
					}
					res.status(200).send(item);
				});
			}
		}
	},function(err){
		return res.status(500).send(err);
	});
};

exports.find = function(req, res){
	var property = req.params.property,
		propValue = req.params.value;
		
	accessData(function(itemList){
		var result = [];
		for(var i=0; i<itemList.length; i++){
			if(property == "quantity" || property == "price"){
				if(itemList[i][property] == propValue){
					result.push(itemList[i]);
				}
			}else if(itemList[i][property]){
				if(itemList[i][property].toUpperCase().indexOf(propValue.toUpperCase()) >= 0){
					result.push(itemList[i]);
				}
			}
		}
		res.status(200).send(result);
	},function(err){
		res.status(200).send([]);
	});
};

exports.findAll = function(req, res){
	accessData(function(data){
		return res.status(200).send(data);
	},function(err){
		return res.status(200).send([]);
	});
};

var accessData = function(onSuccess, onFail){
	fs.readFile(db, function(err, data){
		if(err){
			if(onFail){
				onFail(err);
			}
		}else{
			var dataStr = data.toString();
			
			if(dataStr != ""){
				data = JSON.parse(dataStr);
			}else {
				data = [];
			}
			
			if(onSuccess){
				onSuccess(data);
			}
		}
	});
};

var storeData = function(data, onDone){
	mkdirp(path, function (err) {
		if(err){
			return res.status(500).send(err);
		};

		fs.writeFile(db, JSON.stringify(data), function(err){
			if(onDone){
				onDone(err);
			}
		});
	});
};

var getOne = function(property, propValue, itemList){
	for(var i=0; i<itemList.length; i++){
		if(itemList[i][property].toUpperCase() == propValue.toUpperCase()){
			return itemList[i];
		}
	}
	
	return null;
};
