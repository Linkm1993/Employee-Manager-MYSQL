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

function newDepartment(){
    inquirer
      .prompt([ {
        type: 'input',
        name: 'name',
        message: `Enter the name of the department`
      }
    ])
    .then(answers => {
        connection.connect(function(err) {
            if (err) throw err;

            console.log("connected as id " + connection.threadId + "\n");

            var query = connection.query(
              "INSERT INTO department SET ?",
              {
                name: answers.name,
              },
              function(err, res) {
                if (err) throw err;
              })
              connection.end();
            });
    })
}

function viewDepartments(){
    inquirer
      .prompt([ {
        type: 'list',
        name: 'view_choice',
        message: `View all departments or search for specific department?`,
        choices: ["All Departments", "Search for specific department"]
      }
    ]).then(answers => {
      console.log(answers)
  
      connection.connect(function(err) {
        if (err) throw err;
        if (answers.view_choice === "All Departments") {
            var query = connection.query(
              "SELECT * FROM department",
              function(err, res) {
                if (err) throw err;
                console.table(res)
              })
            }  
          connection.end();
        });
    })
  }

module.exports = {
    newDepartment : newDepartment,
    viewDepartments : viewDepartments
}