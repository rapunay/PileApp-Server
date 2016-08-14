var item = require("../api/Item"),
	image = require("../api/Image"),
	multiparty = require("connect-multiparty"),
	multipartyMiddleware = multiparty();
	
module.exports = function(router) {
	router.route("/item")
		.post(item.insert)
		.put(item.update)
		.get(item.findAll);
	router.route("/item/:id")
		.delete(item.remove);
	router.route("/item/find/:property/:value")
		.get(item.find);
	
	router.route("/image")
		.post(multipartyMiddleware, image.upload);
	router.route("/image/retrieve/:dirname/:filename")
		.get(image.retrieve);
	
	
	router.all('*', function (req, res, next) {
		res.status(404).send({message : 'Nothing here'});
	});
	
	return router;	
};
