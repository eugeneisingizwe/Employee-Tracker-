INSERT INTO department (name)
VALUES ("Officers"),
       ("People Solution"),
       ("IT"),
       ("Human Resources");


INSERT INTO role (title, salary, department_id)
VALUES ("Junior Officer", 120000, 1),
       ("SVP Officer", 200000, 1),
       ("VP Officer", 280000, 1),
       ("SVP Officer", 350000, 1),
       ("EVP Officer", 400000, 1),
       ("President Officer", 500000, 1),
       ("Account Executive", 200000, 2),
       ("Account Manger ", 150000, 2), 
       ("Account Administrator", 55000, 2),
       ("Financial Analyst", 100000, 2),
       ("IT Help Desk", 60000, 3),
       ("Software Engineer", 200000, 3),
       ("Security Engineer", 250000, 3),
       ("Team lead", 70000, 4),
       ("Manager", 90000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Drew", "Scott", 1, NULL),
       ("Mick", "Johnson", 1, NULL),
       ("Eugene", "Isingizwe", 2, NULL),
       ("AB", "Nagusu", 3, 3) ,
       ("Hamadi", "Muganga", 4, 4), 
       ("Sergio", "Gomez", 1,1 ),
       ("Akon", "Money", 4, NULL),
       ("Erik","Martinez", 4, NULL),
       ("Mondo", "Gucci", 2, 2), 
       ("Ruth", "Wanger", 2, NULL),
       ("Megan", "Good", 4, NULL);

