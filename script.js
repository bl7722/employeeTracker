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
    
if(response.command === "Add New Data){

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
            };

            if(decision.table === "Roles"){
            viewRoles();
            };

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

