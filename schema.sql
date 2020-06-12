DROP DATABASE IF EXISTS tracker_db;
CREATE DATABASE tracker_db;

USE tracker_db;

CREATE TABLE department(
id INT NOT NULL AUTO_INCREMENT,
dep_name VARCHAR(30) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE emp_role(
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL(10,2) NOT NULL,
department_id INT NOT NULL,
PRIMARY KEY (id))
;

CREATE TABLE employee(
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_name VARCHAR(30) NOT NULL,
manager_name VARCHAR(30) NOT NULL,
role_id INT,
manager_id INT,
PRIMARY KEY (id)
);


INSERT INTO department(dep_name)
VALUES ("sales"), ("finace"), ("legal");

INSERT INTO emp_role(title,salary,department_id)
VALUES ("salesperson",10000,1), ("accounting",20000,2), ("lawyer",30000,3);


