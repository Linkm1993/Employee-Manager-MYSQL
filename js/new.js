//Adding libaries
const inquirer = require("inquirer");
const mysql = require("mysql")

//connection to local database
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

//Runs the program, starts with inquirer prompt
function startProgram(){
    inquirer
      .prompt([ {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: ['Add Employee', 'View Employees', 'Add Department', 'View Departments', "Add a new role", "Veiw Roles", "Update Employee Role", "Change Employee's Manager", "Remove something from database", "Exit"],
      }
    ])
    .then(answers => {
      console.log(JSON.stringify(answers, null, '  '));
      if (answers.action === 'Add Employee'){
        newEmployee()
      }
  
      else if (answers.action === 'View Employees'){
        viewEmployees()
      }
  
      else if(answers.action === 'Add Department'){
        newDepartment()
      }
  
      else if(answers.action === 'View Departments'){
        viewDepartments()
      }
  
      else if(answers.action === 'Add a new role'){
        newRole()
      }
  
      else if(answers.action === 'Veiw Roles'){
        viewRoles()
      }
  
      else if (answers.action === 'Update Employee Role'){
        updateEmployeeRole()
      }
  
      else if (answers.action === "Change Employee's Manager"){
        updateMangerID()
      }
  
      else if (answers.action === 'Remove something from database'){
        deleter()
      }
      else if (answers.action === 'Exit'){
        process.exit()
      }
    })
}

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
            startProgram()
          })
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
        if (answers.view_choice === "All Employees") {
          let query = connection.query(
            "SELECT * FROM employee",
            function(err, res) {
              if (err) throw err;
              console.table(res)
              startProgram()
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
                  startProgram()
                })
              }
            )
          }
      });
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
          startProgram()
           
      }
      )
    })
}

function newDepartment(){
    inquirer
      .prompt([ {
        type: 'input',
        name: 'name',
        message: `Enter the name of the department`
      }
    ])
    .then(answers => {
            let query = connection.query(
              "INSERT INTO department SET ?",
              {
                name: answers.name,
              },
              function(err, res) {
                if (err) throw err;
                startProgram()
              })
    })
}

function viewDepartments(){
            let query = connection.query(
              "SELECT * FROM department",
              function(err, res) {
                if (err) throw err;
                console.table(res)
                startProgram()
              })
    }
    
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
                let query = connection.query(
                  "INSERT INTO employee_role SET ?",
                  {
                    title: answers.title,
                    salary: answers.salary,
                    department_id: answers.department_id
                  },
                  function(err, res) {
                    if (err) throw err;
                    startProgram()
                  })
                   
                });
        }
    
function viewRoles(){
                let query = connection.query(
                  "SELECT * FROM employee_role",
                  function(err, res) {
                    if (err) throw err;
                    console.table(res)
                    startProgram()
                  })
             
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
        let query = connection.query(
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
            startProgram()
                   
          })
        });
}

function deleter(){
        inquirer
        .prompt([
            {
                type: 'list',
                name: 'selection',
                message: 'What do you want to remove?',
                choices: ['Employee', 'Department', 'Role']
            }
        ]).then(answers =>{
            console.log(answers)
            if (answers.selection === "Employee"){
                inquirer
                .prompt([
                    {
                        type: "input",
                        name: "empid",
                        message: 'Enter the id of the employee you want to remove'
                    }
                ]).then(answers =>{
                        let query = connection.query(`DELETE FROM employee WHERE ?`, [
                            {
                              id: answers.empid
                            }],
                        function(err, res) {
                            if (err) throw err;
                            console.table(res)
                            startProgram()
                          })
                           
                        });    
            }
    
            if (answers.selection === "Department"){
                inquirer
                .prompt([
                    {
                        type: "input",
                        name: "depid",
                        message: 'Enter the id of the department you want to remove'
                    }
                ]).then(answers =>{
                        let query = connection.query(`DELETE FROM department WHERE ?`, [
                            {
                              id: answers.depid
                            }],
                        function(err, res) {
                            if (err) throw err;
                            console.table(res)
                            startProgram()
                          })
                           
                        });    
                
            }
    
            if (answers.selection === "Role"){
                inquirer
                .prompt([
                    {
                        type: "input",
                        name: "roleid",
                        message: 'Enter the id of the role you want to remove'
                    }
                ]).then(answers =>{
                        let query = connection.query(`DELETE FROM employee_role WHERE ?`, [
                            {
                              id: answers.roleid
                            }],
                        function(err, res) {
                            if (err) throw err;
                            console.table(res)
                            startProgram()
                          })
                           
                        });    
                
            }
        })
}
module.exports = {
    startProgram : startProgram
}