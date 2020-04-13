const inquirer = require("inquirer");
const mysql = require("mysql")
const employee = require("./js/employee")
const department = require("./js/department")
const roles = require("./js/roles")
const remove = require("./js/delete")


function startProgram(){
  inquirer
    .prompt([ {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: ['Add Employee', 'View Employees', 'Add Department', 'View Departments', "Add a new role", "Veiw Roles", "Update Employee Role", "Change Employee's Manager", "Remove something from database"],
    }
  ])
  .then(answers => {
    console.log(JSON.stringify(answers, null, '  '));
    if (answers.action === 'Add Employee'){
      employee.newEmployee()
    }

    else if (answers.action === 'View Employees'){
      employee.viewEmployees()
    }

    else if(answers.action === 'Add Department'){
      department.newDepartment()
    }

    else if(answers.action === 'View Departments'){
      department.viewDepartments()
    }

    else if(answers.action === 'Add a new role'){
      roles.newRole()
    }

    else if(answers.action === 'Veiw Roles'){
      roles.viewRoles()
    }

    else if (answers.action === 'Update Employee Role'){
      roles.updateEmployeeRole()
    }

    else if (answers.action === "Change Employee's Manager"){
      employee.updateMangerID()
    }

    else if (answers.action === 'Remove something from database'){
      remove.deleter()
    }
  })
}

startProgram()