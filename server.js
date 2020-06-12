const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
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
            name:"task",
            choices: ["Add New Data", "View Current Data", "Update Employee Roles", "Exit"]
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
            }

            if(selection.addNewData === "Roles"){
                newRole();
            }

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
        }
           if(decision.table === "Roles"){
               viewRoles();
            }
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




//Functions

// Departments
function newDep() {
    inquirer.prompt(
        {
            type: input,
            name:"newDep",
            message:"New Department Name?",
        }
    ).then(function(newInfo){
        var query = connection.query(
        "INSERT INTO department SET ?",
        {
            dep_name: newInfo.newDep
        },
        function(err, res) {
            if (err) throw err;
            console.log(res.changedRows + " Roles created!\n");
            
        }
    );
        viewDeps();
    })
};

//Roles
function newRole() {
    inquirer.prompt([
        {
            type: input,
            name:"newRole",
            message:"New Role Name?",
        },
        {
            type: input,
            name:"newSal",
            message:"New Salary Amount?",
        },
        {
            type: input,
            name:"newDeptId",
            message:"New Department ID?",
        }
    ]).then(function(newInfo){
    
    const query = connection.query(
    "INSERT INTO emp_rol SET ?",
    {
        title: newInfo.newRole,
        salary: newInfo.newSal,
        department_id: newInfo.newDeptId
    },
    function(err, res) {
        if (err) throw err;
        console.log(res.changedRows + " Roles created!\n");
    }
    );
    viewRoles();
});
};

//New Employees
function newEmp() {
    inquirer.prompt([
        {
            type:input,
            name:"first",
            message:"New Employee First Name?",
        },
        {
            type:input,
            name:"last",
            message:"New Employee Last Name?",
        },
        {
            type:input,
            name:"role",
            message:"New Employee Role?",
        },
        {
            type:"list",
            name:"manager",
            message:"New Employee manager?",
            choices: employees
        }
    ]).then(function(newInfo){
    var query = connection.query(
    "INSERT INTO employee SET ?",
    {
        first_name: newInfo.first,
        last_name: newInfo.last,
        role: newInfo.role,
        manager: newInfo.manager,
    },
    function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " Roles created!\n");
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


//viewFullData
function viewFullData() {
    connection.query(`
    SELECT title, salary , department_id
    FROM emp_role
    JOIN employee
    ON emp_role.id = employee.role_id;`, function(err, res) {
    if (err) throw err;
    console.log("")
    console.log("---------------------------------------------------------------------------")
    console.table(res);
    });
}


//updateEmp
function updateEmp() {
    inquirer.prompt([
        {
            type:"list",
            message:"Who's updating?",
            name:"person",
            choices: employees
        },
        {
            type:"list",
            message:"New Role?",
            name:"newRole",
            choices: roles
        }
]).then(function(newInfo){ 
        var query = connection.query(
        "UPDATE employee SET ? WHERE ?",
        [
        {
            role: newInfo.newRole
        },
        {
            first_name: newInfo.person
        }
        ],
        function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " employee updated!\n");
        readEmployees();
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
            message:"All Done?"

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
//getData
function getData(){
    function origRoles() {
        connection.query("SELECT title FROM emp_role", function(err, res) {
        if (err) throw err; 
        for(let i=0; i<res.length; i++){
        roles.push(res[i].title);
        };
        });
    }
    function origEmps() {
        connection.query("SELECT first_name FROM employee", function(err, res) {
        if (err) throw err;
        for(let i=0; i<res.length; i++){  
        employees.push(res[i].first_name);
        }
        });
    }
    origRoles();
    origEmps();
}
};

//Exit
function exit(){
    console.log("Exited Successfully")
    connection.end()
    return;
    }
}