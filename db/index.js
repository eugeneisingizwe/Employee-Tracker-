
const connection = require("./connections");

class Queries {
    constructor(connection){
        this.connection = connection
    }

     //I am presented with a formatted table showing department names and department ids

    getDepartments(){
        return this.connection.promise().query("select * from department;")
    }
     //I am presented with the job title, role id, the department that role belongs to, and the salary for that role

    getRoles(){
        return this.connection.promise().query( "SELECT role.title, role.id, department.name, role.salary FROM role LEFT JOIN department ON role.department_id = department.id;")
    }

     //I am presented with a formatted table showing employee data, including employee ids, 
    //first names, last names, job titles, departments, salaries, and managers that the employees report to

    getEmployees(){
        return this.connection.promise().query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, "" , manager.last_name) AS manager From employee LEFT JOIN role On employee.role_id = role_id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON manager.id = employee.manager_id ')
    }

    //I am prompted to enter the name of the department and that department is added to the database

    createDepartment(department){
        return  this.connection.promise().query("INSERT INTO department set ?", department)
    }
    //I am prompted to enter the name, salary, and department for the role and that role is added to the database
    createRole(role){
        return this.connection.promise().query("INSERT INTO role set ?", role)
    }

    //I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added 

    createEmployee(employee){
        return this.connection.promise().query("INSERT into employee set ?", employee)
    }

    // I am prompted to select an employee to update and their new role and this information is updated in the database 

    updateEmployeeRole(roleID, employeID){
        return this.connection.promise().query("UPDATE employee SET role_id =? WHERE id =?", [roleID, employeID])
    }

}

module.exports = new Queries(connection);