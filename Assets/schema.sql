DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE departments (
  id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
  id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL,
  department_id INTEGER NOT NULL,
  CONSTRAINT fk_department_id FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE employee (
  id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NULL,
  role_id INTEGER NOT NULL,
  CONSTRAINT fk_role_id FOREIGN KEY (role_id) REFERENCES roles(id),
  manager_id INTEGER NOT NULL,
  CONSTRAINT fk_manager_id FOREIGN KEY (manager_id) REFERENCES departments(id)
);

SELECT employee.first_name AS First_Name, employee.last_name AS Last_Name, roles.title AS Title, roles.salary AS Salary, departments.name AS Department FROM employee LEFT JOIN roles ON role_id LEFT JOIN departments ON department_id