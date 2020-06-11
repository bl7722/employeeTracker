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
salary DECIMAL(10,4) NOT NULL,
department_id INT NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE employee(
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role VARCHAR(30) NOT NULL,
role_id INT,
manager VARCHAR(30),
manager_id INT,
PRIMARY KEY (id)
);



SELECT dep_name
FROM department
JOIN emp_role
ON department.id = emp_role.department_id;

SELECT title, salary , department_id
FROM emp_role
JOIN employee
ON emp_role.id = employee.role_id;

SELECT * FROM employee;

