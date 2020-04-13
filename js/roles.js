const inquirer = require("inquirer")
const mysql = require("mysql")

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "RavexSam741",
  database: "company_db"
});

function newRole(){
    inquirer
      .prompt([ {
        type: 'input',
        name: 'title',
        message: `Please enter a title`
      },
      {
          type: 'input',
          name: 'salary',
          message: 'Please enter the salary'
      },
      {
          type: 'input',
          name: 'department_id',
          message: 'Please enter the department id'
      }
    ])
    .then(answers => {
        connection.connect(function(err) {
            if (err) throw err;
            var query = connection.query(
              "INSERT INTO employee_role SET ?",
              {
                title: answers.title,
                salary: answers.salary,
                department_id: answers.department_id
              },
              function(err, res) {
                if (err) throw err;
              })
              connection.end();
            });
    })
}

function viewRoles(){
    connection.connect(function(err) {
        if (err) throw err;
            var query = connection.query(
              "SELECT * FROM employee_role",
              function(err, res) {
                if (err) throw err;
                console.table(res)
              })
        connection.end();
      });
}

function updateEmployeeRole(){
  inquirer
      .prompt([ 
        {
          type: 'input',
          name: 'firstname',
          message: 'Enter the employee id you want to change'
        },
        
        {
        type: 'input',
        name: 'newrole',
        message: `Enter a new role number`
      }
    ])
    .then(answers => {
  connection.connect(function(err) {
    if (err) throw err;
    var query = connection.query(
      "UPDATE employee SET ? WHERE ?",
      [
        {
          role_id: answers.newrole
        },
        {
          id: answers.firstname
        }
      ],
      function(err, res) {
        if (err) throw err;
        console.table(res)
        connection.end();      
      })
    });
  })
}

module.exports = {
    newRole : newRole,
    viewRoles: viewRoles,
    updateEmployeeRole: updateEmployeeRole
}