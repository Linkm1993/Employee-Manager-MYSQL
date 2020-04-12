const inquirer = require("inquirer");
const mysql = require("mysql")
const employee = require("./js/employee")
const department = require("./js/department")


function startProgram(){
  inquirer
    .prompt([ {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: ['Add Employee', 'View Employees', 'Add Department', 'View Departments'],
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
  })
}

startProgram()