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
//var to const
  tracker()=> {
    var emp = [];
    var role = [];

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