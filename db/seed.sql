use employees_db;

INSERT INTO department
    (name)

VALUES
    ('Sales'),
    ('Fleet'),
    ('Accounting'),
    ('Marketing');


INSERT INTO role
    (title, salary, department_id)

VALUES
    ('Sales Lead', 120000, 1),
    ('Regional Manager', 89000, 1),
    ('Fleet Manager', 90000, 2),
    ('Fleet Coordinator', 45000, 2),
    ('Controller', 130000, 3),
    ('Accountant', 75000, 3),
    ('Marketing Director', 125000, 4),
    ('Marketing Assistant', 45000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)

VALUES
    ('Craig', 'Fall', 1, NULL),
    ('Nick', 'Yessi', 2, 1),
    ('Joey', 'Pierre', 2, NULL),
    ('Kevin', 'Dale', 4, 3),
    ('Becky', 'Smith', 5, NULL),
    ('Ellie', 'Doe', 6, 5),
    ('Sarah', 'Hedall', 7, NULL),
    ('Chris', 'Allen', 8, 1),
    ('Robert', 'Denero', 3, 3),
    ('Herbert', 'Rane', 4, NULL);

