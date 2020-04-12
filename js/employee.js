const inquirer = require("inquirer")
const mysql = require("mysql")

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "company_db"
});


function newEmployee(){
  inquirer
    .prompt([ {
      type: 'input',
      name: 'first_name',
      message: `Enter the employee's first name`
    },
    {
      type: 'input',
      name: 'last_name',
      message: `Enter the employee's last name`
    },
    {
      type: 'input',
      name: 'manager_id',
      message: `Enter the employee's manage id number`
    }
  ])
  .then(answers => {

    connection.connect(function(err) {
      if (err) throw err;

      var query = connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answers.first_name,
          last_name: answers.last_name,
          manager_id: answers.manager_id
        },
        function(err, res) {
          if (err) throw err;
        })
        connection.end();
      });
  });
}

function viewEmployees(){
  inquirer
    .prompt([ {
      type: 'list',
      name: 'view_choice',
      message: `View all departments or search for specific department?`,
      choices: ["All Employees", "Search for specific employee"]
    }
  ]).then(answers => {
    console.log(answers)

    connection.connect(function(err) {
      if (err) throw err;

      var query = connection.query(
        "SELECT * FROM employee",
        function(err, res) {
          if (err) throw err;
          console.table(res)
        })
        connection.end();
      });
  })
}


module.exports = { 
  newEmployee: newEmployee,
  viewEmployees: viewEmployees
  }