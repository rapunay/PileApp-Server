var db = require(__dirname + "/../db/mysql");

exports.insert = function(req, res, next){
	var item = req.body;
	
	db.query("INSERT INTO item(id, name, model, type, quantity, price, description, itemImage) VALUES (?,?,?,?,?,?,?,?)",
		[item.id, item.name, item.model, item.type, item.quantity, item.price, item.description, item.itemImage],
		
		function(err, row){
			if(err){
				return res.status(500).send(err);
			}
			selectOne(row.insertId, function(newRow){
				if(!newRow){
					return res.status(500).send({message: "Item ("+row.insertId+") was not created."});
				}else{
					return res.status(200).send(newRow);
				}
			});
		}
	);
};

exports.remove = function(req, res, next){
	db.query("UPDATE item SET _recStatus = 'DELETED' WHERE _id=?",
		[req.params.id],
		
		function(err, row){
			if(err){
				return res.status(500).send(err);
			}
			if(row.length === 0){
				return res.status(404).send({message: "Item ("+req.params.id+") was not removed."})
			}else{
				selectOne(req.params.id, function(removedRow){
					return res.status(200).send(removedRow);
				});
			}
		}
	);
};

exports.hardRemove = function(req, res, next){
	db.query("DELETE from item WHERE id=?",
		[req.params.id],
		
		function(err, row){
			if(err){
				return res.status(500).send(err);
			}
			if(row.length === 0){
				return res.status(404).send({message: "Item ("+req.params.id+") was not removed."})
			}else{
				return res.status(200).send({id: req.params.id});
			}
		}
	);
};

exports.update = function(req, res, next){
	var item = req.body;
	
	db.query("UPDATE item SET name=?, model=?, type=?, quantity=?, price=?, description=?, itemImage=?, _recStatus='ACTIVE', _updated=now() WHERE id=?",
		[item.name, item.model, item.type, item.quantity, item.price, item.description, item.itemImage, item.id],
		
		function(err, row){
			if(err){
				return res.status(500).send(err);
			}
			if(row.length === 0){
				return res.status(404).send({message: "Item ("+item.id+") was not updated."})
			}else{
				selectOne(item._id, function(updatedRow){
					return res.status(200).send(updatedRow);
				});
			}
		}
	);
};

exports.find = function(req, res, next){
	var property = req.params.property,
		propValue = req.params.value;

	db.query("SELECT * FROM item WHERE "+property+" LIKE '%"+propValue+"%'",
		function(err, rows){
			if(err){
				return res.status(500).send(err);
			}
			return res.status(200).send(rows);
		}
	);

};

exports.findAll = function(req, res, next){
	db.query("SELECT * FROM item",
		function(err, rows){
			if(err){
				return res.status(500).send(err);
			}
			return res.status(200).send(rows);
		}
	);
};

var selectOne = function(id, callback){
	db.query("SELECT * FROM item WHERE _id=? LIMIT 1",
		[id],
		
		function(err, rows){
			if(err || rows.length === 0){
				callback(null);
			}else{
				callback(rows[0]);
			}
		}
	);
}
