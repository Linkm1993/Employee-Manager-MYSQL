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
                connection.connect(function(err) {
                    if (err) throw err;
                    let query = connection.query(`DELETE FROM employee WHERE ?`, [
                        {
                          id: answers.empid
                        }],
                    function(err, res) {
                        if (err) throw err;
                        console.table(res)
                      })
                      connection.end();
                    });
            })

            
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
                connection.connect(function(err) {
                    if (err) throw err;
                    let query = connection.query(`DELETE FROM department WHERE ?`, [
                        {
                          id: answers.depid
                        }],
                    function(err, res) {
                        if (err) throw err;
                        console.table(res)
                      })
                      connection.end();
                    });
            })

            
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
                connection.connect(function(err) {
                    if (err) throw err;
                    let query = connection.query(`DELETE FROM employee_role WHERE ?`, [
                        {
                          id: answers.roleid
                        }],
                    function(err, res) {
                        if (err) throw err;
                        console.table(res)
                      })
                      connection.end();
                    });
            })

            
        }
    })
}

module.exports = {
    deleter : deleter
}
