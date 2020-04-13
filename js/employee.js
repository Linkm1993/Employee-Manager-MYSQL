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
      message: `Enter the employee's manager id number`
    },
    {
      type: 'input',
      name: 'role_id',
      message: 'Please enter the role id for their job'
    }
  ])
  .then(answers => {

    connection.connect(function(err) {
      if (err) throw err;

      let query = connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answers.first_name,
          last_name: answers.last_name,
          manager_id: answers.manager_id,
          role_id: answers.role_id
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
      message: `View all employees or search for specific employee?`,
      choices: ["All Employees", "Search for all employees under a manager"]
    }
  ]).then(answers => {
    console.log(answers)

    connection.connect(function(err) {
      if (err) throw err;
      if (answers.view_choice === "All Employees") {
        let query = connection.query(
          "SELECT * FROM employee",
          function(err, res) {
            if (err) throw err;
            console.table(res)
            connection.end();

          })
        }
        if (answers.view_choice === "Search for all employees under a manager"){
          inquirer
          .prompt([{
            type : 'input',
            name : 'id',
            message: `Enter a manager id`
          }]).then(answers =>{
            let query = connection.query(
              `SELECT * FROM employee WHERE manager_id=?`, answers.id,
              function(err, res) {
                if (err) throw err;
                console.table(res)
                connection.end();
              })
            }
          )
        }
    });
  })
}

function updateMangerID(){
  inquirer
  .prompt([{
    type : 'input',
    name : 'employeeid',
    message: `Enter the id of the employee you want to change`
  },
  {
    type: 'input',
    name : 'newmanger',
    message: 'Enter the new manager id'
  }
  ]).then(answers =>{
    let query = connection.query(
      "UPDATE employee SET ? WHERE ?",
      [
        {
          manager_id: answers.newmanger
        },
        {
          id: answers.employeeid
        }
      ],
      function(err, res) {
        if (err) throw err;
        console.table(res)
        connection.end();
    }
    )
  })
}




module.exports = { 
  newEmployee: newEmployee,
  viewEmployees: viewEmployees,
  updateMangerID : updateMangerID
  }