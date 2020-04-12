const inquirer = require("inquirer")

function newEmployee(){
  inquirer
    .prompt([ {
      type: 'list',
      name: 'size',
      message: 'Test',
      choices: ['Jumbo'],
    }
  ])
  .then(answers => {
    console.log(JSON.stringify(answers, null, '  '));
  });
}

function viewEmployees(){
  console.log("Testing")
}

module.exports = { 
  newEmployee: newEmployee,
  viewEmployees: viewEmployees
  }