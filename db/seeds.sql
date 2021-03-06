
INSERT INTO department (name)
VALUES
('Sales'),
('IT'),
('Legal'),
('Accounting');

INSERT INTO role (title, salary, department_id)
VALUES
('Salesperson', 150000, 1),
('Account Manager', 100000, 3),
('Software Engineer', 150000, 2),
('Lead Engineer', 200000, 2),
('Lawyer', 1500000, 3),
('Legal Team Counsel', 150000, 3),
('Accountant', 100000, 4),
('Account Manager', 100000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("John", "Doe", 1, NULL),
("Joe", "Joseph", 2, 1),
("Amy", "Sanchez", 3, 1),
("Kevin", "Smith", 4, 1),
("Jason", "Freeman", 5, 1),
("John", "Smith", 5, 1),
("Brian", "McCormick", 4, 1),
("Jack", "Sliman", 8, 1);

