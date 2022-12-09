//Importing mtsql2
const inquire = require("inquirer");
const db = require("./db");
const {connection} = require("./db");

//importing console.table 
const consoleTable = require("console.table");

require("dotenv").config();


//initiate the promote 
   


//Promt to display when the application is started 

  const startPrompt = () => {
    inquire
     .prompt ([
        {
            type: "list",
            name: "choices",
            message: "What would like to do?",
            choices: [
                 "View all departments",
                 "view all roles",
                 "View all employees",
                 "Add a department",
                 "Add a role",
                 "Add an employee",
                 "Update an employee role",
                 "No action"
            ]

        }
     ]).then((response) => {
        const {choices} = response;

        if (choices === "View all departments"){
            viewAllDepartments();
        }

        if (choices === "view all roles"){
            viewAllRoles();
        }

        if (choices === "View all employees"){
            viewAllEmployees();
        }


        if (choices === "Add a department"){
            addDepartment();
        }

        if (choices ===  "Add a role"){
            addRole();
        }

        if (choices ===  "Add an employee"){
            addEmployee();
        }

        if (choices ===  "Update an employee role"){
            updateEmployeeRoles();
        }

        if (choices === "No action"){
            connection.end();
        }
     })
  };


//Functionn to View all departments"

viewAllDepartments = () => {
    db.getDepartments().then(([departamnets]) =>{

        console.log("*********************")
        console.log("*********************")
        console.log("Viwing All Departments")
        console.log("*********************")
        console.log("*********************")

        console.log(departamnets)
    }).then(() => startPrompt())

};


//function to view all roles
viewAllRoles = () => {
    db.getRoles().then(([roles]) => {

        console.log("*********************")
        console.log("*********************")
        console.log("***Viwing All Roles**")
        console.log("*********************")
        console.log("*********************")

        console.log(roles)

    }).then(() => startPrompt())

};


//function to View all employees

viewAllEmployees = () => { 

    db.getEmployees().then(([employees]) => {

        console.log("*********************")
        console.log("*********************")
        console.log("*Viewing All Employee*")
        console.log("*********************")
        console.log("*********************")

        console.log(employees);

    }).then(() => startPrompt())

   
};


//fuction to Add a department

addDepartment = () => {
    console.log("*********************")
    console.log("*********************")
    console.log("*Adding a Department*")
    console.log("*********************")
    console.log("*********************")

    inquire
    .prompt([
        {
            type: "input",
            name:"addDepartment",
            message: "What department would you like to add?",
            validate: addDepartment => {
                if (addDepartment){
                    return true;
                }else {
                    console.log("Please add a department");
                    return false
                }
            }
        }
    ]).then(function (response){
        db.createDepartment(response.addDepartment).then(() => startPrompt())
    })
};

//Fuction to Add a role"

addRole =() =>{
    console.log("*********************")
    console.log("*********************")
    console.log("***Adding a Role*****")
    console.log("*********************")
    console.log("*********************")

    db.getDepartments().then(([departamnets]) => {
        const addRoleToDepartment = departamnets.map((({name, id}) => ({name: name, value: id})))});

    inquire
    .prompt([
        {
            type: "input",
            name:"role",
            message: "Would you like to add a role?",
            validate: addRole => {
                if (addRole){
                    return true;
                }else {
                    console.log("Please add a role");
                    return false;
                }
            }
        },

    //prompt to add salary to the role created 
        {
            type: "input",
            name: "salary",
            validate: addSalary => {
                if(isNaN(addSalary)){
                    return true;
                }else{
                    console.log('Plese enter a salary');
                    return false;
                }
            }
        },

            //prompt to add a departmnet to the created role 

            {
                type: "list",
                name: "department",
                message: "What deparment does this role belong to?",
                choices: addRoleToDepartment
            }

    ]).then(function (response){
        db.createRole(response).then(() => startPrompt())
    })
};

//Fuction to Add an employee

addEmployee = () =>{

    console.log("*********************")
    console.log("*********************")
    console.log("***Adding Employee*****")
    console.log("*********************")
    console.log("*********************")

    db.getRoles().then(([roles]) => {
        const addRoleToEmployee = roles.map((({id, title}) => ({name: title, value: id})))})

    db.getEmployees().then(([employees]) => {
        const AddManagerToEmployee = employees.map(({id, first_name, last_name}) => ({name: first_name +""+last_name, value:id}));})

      
    inquire
    .prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is the first name of the employee",
            validate: addFirstName =>{
                if (addFirstName){
                    return true;
                }else {
                    console.log("Please add employee first name");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the employee's last name?",
            validate: addLastName =>{
                if (addLastName){
                    return true;
                }else {
                    console.log("Please add an employee last name");
                    return false;
                }
            }

        }, 

            {
                type: "list",
                name: "role",
                choices: addRoleToEmployee
            },
        

            {
                type: "list",
                name: "manager",
                message: "Would you like to add employee's manager?",
                choices: AddManagerToEmployee
            }
        

    ]).then(function (response){
        db.createEmployee(response).then(() => startPrompt())
    })
}

 // fuction Update an employee role"

  updateEmployeeRoles = () => {
    
    console.log("*********************")
    console.log("*********************")
    console.log("Updated Employye Role")
    console.log("*********************")
    console.log("*********************")

  
    db.getRoles().then(([roles]) => {

        const pickRole = roles.map(({id, first_name, last_name}) => ({name: first_name + ""+last_name, value:id}))});

    db.getEmployees().then(([employees]) => {
        const pickEmployee = employees.map(({id, first_name, last_name}) => ({name: first_name + ""+last_name, value:id}))});
    
        inquire
        .prompt([
            {
                type: "list",
                name: "name",
                message: "Which employee would like to update?",
                choices: pickRole
            },
             {
                        type: "list",
                        name: "role",
                        message: "What is the employee new role?",
                        choices: pickEmployee
        },
                ]).then(function (response) {
                    db.updateEmployeeRole().then(() => startPrompt)
                })

            
            }

            startPrompt();