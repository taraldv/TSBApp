DROP TABLE IF EXISTS temperatureTable;

CREATE TABLE temperatureTable(
	temperatureId INTEGER AUTO_INCREMENT,
	temperatureValue INTEGER NOT NULL,
	PRIMARY KEY (temperatureId));

INSERT INTO temperatureTable(temperatureValue) VALUES(20),
(20),
(20),
(20),
(20),
(20),
(20),
(20);