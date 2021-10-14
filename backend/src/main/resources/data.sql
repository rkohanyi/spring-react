TRUNCATE employee_departments CASCADE;
TRUNCATE employee CASCADE;
TRUNCATE department CASCADE;

INSERT INTO department VALUES
(1, 'Zoldseg'),
(2, 'Hus'),
(3, 'Alkohol'),
(4, 'Tejtermekek');

INSERT INTO employee VALUES
(1, 'user'),
(2, 'Mari'),
(3, 'Piri'),
(4, 'Pali');

INSERT INTO employee_departments VALUES
(1, 1),
(1, 2),
(1, 4),
(2, 3),
(4, 1),
(4, 3);
