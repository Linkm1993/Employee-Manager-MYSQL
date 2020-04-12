const inquirer = require("inquirer");
const mysql = require("mysql")
const employee = require("./js/employee")
inquirer
  .prompt([ {
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: ['Add Employee', 'View Employees'],
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
});