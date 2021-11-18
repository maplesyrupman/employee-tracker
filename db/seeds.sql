INSERT INTO departments (dept_name)
VALUES
    ('management'),
    ('it'),
    ('administration'),
    ('mortgages'),
    ('real estate'),
    ('leasing');

INSERT INTO roles (title, salary, dept_id)
VALUES
    ('president', 100000, 1),
    ('vice president', 80000, 1),
    ('it specialist', 70000, 2),
    ('office chick', 50000, 3),
    ('mortgage agent', 40000, 4),
    ('mortgage assistant', 20000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Matthew', 'Vettese', 1, NULL),
    ('Chris', 'White', 2, 1),
    ('William', 'Weiland', 3, 2),
    ('Jeniffer', 'Something', 4, 1),
    ('Mike', 'Manning', 5, 3),
    ('Abby', 'Cotts', 6, 5);