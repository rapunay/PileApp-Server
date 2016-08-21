DROP TABLE IF EXISTS item;
CREATE TABLE item(
	_id int(11) AUTO_INCREMENT PRIMARY KEY,
	id varchar(10) NOT NULL,
	name varchar(30) NOT NULL,
	model varchar(20),
	type varchar(20),
	quantity int(11),
	price float(11),
	description text(300),
	itemImage text(1000),
	_created timestamp DEFAULT CURRENT_TIMESTAMP,
	_recStatus varchar(8) DEFAULT 'ACTIVE',
	_updated timestamp,
    UNIQUE(id)
);
