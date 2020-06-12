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


INSERT INTO employee (first_name, last_name, role_name, manager_name, role_id, manager_id)
VALUES
("Shaggy","Rogers","salesperson","N/A",1,0), 
("Fred","Jones","accounting","Yes", 2,1), 
("Scoby","Doo","lawyer","N/A",3,0),
("Velma","Dinkley","accounting","N/A",4,0);

SELECT dep_name
FROM department
JOIN emp_role
ON department.id=emp_role.department_id;

SELECT title, salary , department_id
FROM emp_role
JOIN employee
ON emp_role.id=employee.role_id;

SELECT * FROM employee;
