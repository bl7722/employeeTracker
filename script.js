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
    tracker(); //app
  });
//var to const
  function tracker() {
      viewData();
      const emp = [];
      const role = [];
      getData();
  }

inquirer.prompt(
    {
        type:"list",
        name:"task",
        message:"Select Task",
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
                viewAll();
                restart();
               
        };
    });
};
           if(response.command === "Update Employee Roles"){
               updateEmp();
           }

           if(response.command === "Exit"){
               exit();
           }

});

function newDep() {
    inquirer.prompt(
        {
            name:"newDept",
            message:"New Department Name?",
        }
    ).then(function(newInfo){
        var query = connection.query(
        "INSERT INTO department SET ?",
        {
            dep_name: newInfo.newDept
        },
        function(err, res) {
            if (err) throw err;
            console.log(res.changedRows + " Roles created!\n");
            
        }
    );
        viewDeps();
    })
};

function newRole() {
    inquirer.prompt([
        {
            name:"newRole",
            message:"New Role Name?",
        },
        {
            name:"newSal",
            message:"New Salary Amount?",
        },
        {
            name:"newDeptId",
            message:"New Department ID?",
        }
    ]).then(function(newInfo){
    
    const query = connection.query(
    "INSERT INTO emp_rol SET ?",
    {
        title: newInfo.newRole,
        salary: newInfo.newPay,
        department_id: newInfo.newDeptid
    },
    function(err, res) {
        if (err) throw err;
        console.log(res.changedRows + " Roles created!\n");
    }
    );
    viewRoles();
});
};

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

function viewDeps() {
    connection.query("SELECT * FROM department", function(err, res) {
    if (err) throw err;
    console.table(res);
    restart();    
    });
}