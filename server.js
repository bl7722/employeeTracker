//Run schema.sql file first!
const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  //use personal password
  password: "brandonSwim1!",
  database: "tracker_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  tracker();
});

function tracker(){
    viewFullData();
    getData();
    const employees = [];
    const roles = [];

// First Question
        inquirer.prompt(
    {
        type:"list",
        message:"Select Task",
        name:"command",
        choices: ["Add New Data", "View Current Data", "Update Employee Roles","Exit"]
    }
).then(function(response){

    if(response.command === "Add New Data"){
        inquirer.prompt(
            {
                type:"list",
                name:"addNewData",
                message: "Where Adding?",
                choices: ["Departments", "Roles", "Employees"]
            }
        ).then(function(selection){

    if(selection.addNewData === "Departments"){
            newDep();
        };

    if(selection.addNewData === "Roles"){
            newRole();
        };

    if(selection.addNewData === "Employees"){
            newEmp();
        };
    });
    };

//Viewable
    if(response.command === "View Current Data"){
        inquirer.prompt(
            {
                type:"list",
                name:"table",
                message:"Which Data?",
                choices:["Departments", "Roles", "Employees","All"]
            }
        ).then(function(decision){


    if(decision.table === "Departments"){
            viewDeps();
        };

    if(decision.table === "Roles"){
            viewRoles();
        };

    if(decision.table === "Employees"){
            viewEmps();
        };
    if(decision.table === "All"){
            viewFullData();
            restart();
        };
    });
    };
//Updates
    if(response.command === "Update Employee Roles"){
            updateEmp();
        }
//Exit
    if(response.command === "Exit"){
        exit();
    }

});


//New Departments
function newDep() {
    inquirer.prompt(
        {
            name:"newDepartment",
            message:"New Department Name?",
        }
    ).then(function(newInfo){
        const query = connection.query(
            "INSERT INTO department SET ?",
        {
            dep_name: newInfo.newDepartment
        },
        function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " Departments created!\n");
            
        }
    );
        viewDeps();
    })
};

//New Roles
function newRole() {
    inquirer.prompt([
        {
            
            name:"newRole",
            message:"New Role Name?"
        },
        {
            
            name:"newSal",
            message:"New Salary Amount?"
        },
        {
            
            name:"newDepartmentId",
            message:"New Department ID?"
        }
    ]).then(function(newInfo){
    const query = connection.query(
        "INSERT INTO emp_role SET ?",
    {
        title: newInfo.newRole,
        salary: newInfo.newSal,
        department_id: newInfo.newDepartmentId
    },
    function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + "Roles created!\n");
    }
    );
    viewRoles();
});
};

//New Employees
function newEmp() {
    inquirer.prompt([
        {
            
            name:"first",
            message:"New Employee First Name?",
        },
        {
            
            name:"last",
            message:"New Employee Last Name?",
        },
        {
            
            name:"role",
            message:"New Employee Role?",
        },
        {
            type:"list",
            name:"manager",
            message:"New Employee Manager?",
            choices:employees
        }
    ]).then(function(newInfo){
    const query = connection.query(
        "INSERT INTO employee SET ?",
    {
        first_name: newInfo.first,
        last_name: newInfo.last,
        role_name : newInfo.role,
        manager_name : newInfo.manager,
    },
    function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " employees created!\n");
    }
    );
    viewEmps();
});
};

//Departments Data
function viewDeps() {
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        console.table(res);
        restart();    
    });
}
//Roles Data
function viewRoles() {
    connection.query("SELECT * FROM emp_role", function(err, res) {
        if (err) throw err;
        console.table(res);
        restart();
    });
}
//Employees Data
function viewEmps() {
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        console.table(res);
        restart();
    });
}
//View Full Data
function viewFullData() {
    connection.query(`
            SELECT title, salary , department_id
            FROM emp_role
            JOIN employee
            ON emp_role.id = employee.role_id;`, function(err, res) {
        if (err) throw err;
        console.log("")
        console.log("----------------------")
        console.table(res);
    });
}

//updateEmp
function updateEmp() {
    inquirer.prompt([
        {
            type:"list",
            name:"person",
            message: "Who's updating?",
            choices: employees
        },
        {
            type:"list",
            name:"newRole",
            message:"New Role?",
            choices: roles
        }
]).then(function(newInfo){ 
    const query = connection.query(
        "UPDATE employee SET ? WHERE ?",
        [
            {
                role_name: newInfo.newRole
            },
            {
                first_name: newInfo.person
            }
        ],
        function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " employees updated!\n");
        viewEmps();
        }
    );
});

}


//Reset
function restart(){
    inquirer.prompt(
        {
            type:"confirm",
            name:"confirm",
            message:"Anything Else?"

        }
    ).then(function(reboot){
        if (reboot.confirm === true){
            tracker();
        }
        else{
            exit();
        }
    })
}

//Starting Data
function getData(){
    function origViewRoles() {
        connection.query("SELECT title FROM emp_role", function(err, res) {
            if (err) throw err; 
            for(let i=0; i<res.length; i++){
            roles.push(res[i].title);
        };
        });
    }
    function origViewEmps() {
        connection.query("SELECT first_name FROM employee", function(err, res) {
            if (err) throw err;
            for(let i=0; i<res.length; i++){  
            employees.push(res[i].first_name);
        }
        });
    }
    origViewRoles();
    origViewEmps();
}
};

//Exit
function exit(){
    console.log("Exited Successfully!")
    connection.end()
    return;
};