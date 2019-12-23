const Inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');

// require("dotenv").config()

const con = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "ewmp49",
    database: "employees_db"
});

function toDo() {
    return Inquirer.prompt([
        {
            message: "What would you like to do?",
            type: "list",
            name: "whatToDo",
            choices: ['View Departments',
                'View Roles',
                'View Employees',
                'Add Department',
                'Add Role',
                'Add Employee',
                'Change Employee Role']
        }
    ])

}

function viewDepartments() {
    con.connect(function (err) {
        if (err) throw err;
        //Select all customers and return the result object:
        con.query("SELECT * FROM departments", function (err, result, fields) {
            if (err) throw err;
            console.table(result);
        });
    });
}

function viewRoles() {
    con.connect(function (err) {
        if (err) throw err;
        con.query("SELECT * FROM roles", function (err, result, fields) {
            if (err) throw err;
            console.table(result);
        });
    });
}

function viewEmployees() {
    con.connect(function (err) {
        if (err) throw err;
        con.query("SELECT employee.first_name AS First_Name, employee.last_name AS Last_Name, roles.title AS Title, roles.salary AS Salary, departments.department_name AS Department FROM employee LEFT JOIN roles ON role_id LEFT JOIN departments ON department_id", function (err, result, fields) {
            if (err) throw err;
            console.table(result);
        });
    });
}

function addDepartmentPrompt() {
    return Inquirer.prompt([
        {
            message: "What is the name of the department?",
            type: "input",
            name: "departmentName"
        }
    ])

}

function addRole() {
    return Inquirer.prompt([
        {
            message: "What is the role's title?",
            type: "input",
            name: "roleTitle"
        }, {
            mesage: "What is the salary?",
            type: "input",
            name: "roleSalary"
        }
    ])

}

function addEmployee() {
    con.connect(function (err) {
        if (err) throw err;
        con.query("SELECT id, title FROM roles", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            let roles = [];

            for(let i = 0; i < result.length; i++){
                roles.push(result.title);
                
            }

            console.log(roles);
        
            return Inquirer.prompt([
                {
                    message: "What is your first name?",
                    type: "input",
                    name: "firstName"
                }, {
                    mesage: "What is your last name?",
                    type: "input",
                    name: "lastName"
                }, {
                    message: "What is your role?",
                    type: "list",
                    name: "role",
                    choices: roles
                }

            ])
                .then(function insertEmployee(data) {
                    let role_id;
                    for(let i = 0; i < roles.length; i++){
                        if(data.role === roles[i]){
                            role_id = i+1;
                        }
                    }
                    let query = con.query(
                        "INSERT INTO employee SET ?",
                        {
                            first_name: data.firstName,
                            last_name: data.lastName,
                            role_id: role_ID,
                            manager_id: data.manager_ID
                        },
                        function (err, res) {
                            if (err) throw err;
                            console.log(res.affectedRows + " employee inserted!\n");
                        }
                    )
                    console.log(data);
                });
            });
        });
    }

// app.get("/api/songs/artist", (req, res) => {
//     const artist = req.query.q;
//     // res.send(`You want all songs by ${artist}.`);

//     connection.query(
//         "SELECT * FROM  WHERE artist = ?;",
//         [artist],
//         (err, response) => {
//             if (err) {
//                 console.log(err);
//                 res.status(500);
//                 return res.send("There was an error querying the database.");
//             }

//             res.json(response);

//         }
//     );

// });

function changeEmployeeRole() {
    return Inquirer.prompt([
        {
            message: "Which employee are you trying to update?",
            type: "input",
            name: "update_name"
        },{
            message: "What is their new role?",
            type: "input",
            name: "new_role"
        }
    ])
    con.connect(function(err) {
        if (err) throw err;
        var sql = " SET address = 'Canyon 123' WHERE address = 'Valley 345'";
        }

toDo().then((data) => {
            console.log(data.whatToDo);
            if (data.whatToDo === "View Roles") {
                viewRoles();
            } else if (data.whatToDo === "View Employees") {
                viewEmployees();
            } else if (data.whatToDo === "Add Department") {
                addDepartment();
            } else if (data.whatToDo === "Add Role") {
                addRole();
            } else if (data.whatToDo === "Add Employee") {
                addEmployee();
            }
        })


// SELECT employee.first_name AS First_Name, employee.last_name AS Last_Name, roles.title AS Title, roles.salary AS Salary, departments.name AS Department FROM employee LEFT JOIN roles ON role_id LEFT JOIN departments ON department_id