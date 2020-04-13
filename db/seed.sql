INSERT INTO department(name)
VALUES("Web Development");

INSERT INTO department(name)
VALUES("Project Manager");

INSERT INTO employee(first_name, last_name,manager_id,role_id)
VALUES("Matthew", "Link", 1, 1);

INSERT INTO employee(first_name, last_name,manager_id,role_id)
VALUES("Nick", "Smith",1,2);


INSERT INTO employee_role(title, salary, department_id)
VALUES("Web Developer", 45000, 1);

INSERT INTO employee_role(title, salary, department_id)
VALUES("Project Manager", 65000, 2);