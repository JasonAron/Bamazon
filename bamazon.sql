DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
    item_id INT(5) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, price, stock_quantity)
	VALUES ("shamwow", 20.00, 25),
    ("xbox", 200.00, 5),
    ("xplaystation", 200.00, 4),
    ("wii", 150.00, 3),
    ("asus laptop", 800.00, 2),
    ("mac laptop", 2400.00, 1),
    ("lenovo laptop", 900.00, 5),
    ("nvidia graphics card", 450.00, 5),
    ("iphone 8", 750.00, 5);
    
SELECT * FROM products;