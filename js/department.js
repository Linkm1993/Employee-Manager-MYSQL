const inquirer = require("inquirer")
const mysql = require("mysql")

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: " ",
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
            let query = connection.query(
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
      connection.connect(function(err) {
        if (err) throw err;
            let query = connection.query(
              "SELECT * FROM department",
              function(err, res) {
                if (err) throw err;
                console.table(res)
              })
        connection.end();
      });
    }
  

module.exports = {
    newDepartment : newDepartment,
    viewDepartments : viewDepartments
}