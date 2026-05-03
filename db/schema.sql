DROP TABLE IF EXISTS orders_products;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS products; 

CREATE TABLE users(
 id SERIAL PRIMARY KEY,
 username text NOT NULL UNIQUE,
 password text NOT NULL
);

CREATE TABLE orders (
 id serial PRIMARY KEY,
 date date NOT NULL,
 note text,
 user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE
);


CREATE TABLE products(
id serial PRIMARY KEY ,
title text NOT NULL,
description text NOT NULL,
price decimal NOT NULL
);

CREATE TABLE orders_products(
id serial PRIMARY KEY,
quantity integer NOT NULL,
product_id integer NOT NULL REFERENCES products(id) ON DELETE CASCADE,
order_id integer NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
unique(product_id, order_id)
);