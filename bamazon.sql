CREATE DATABASE Bamazon;
USE Bamazon;

CREATE TABLE products (
	id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(45) NOT NULL,
	department VARCHAR(45) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INT NOT NULL,
	PRIMARY KEY (id)

);