//pulling up the mysql and inquirer npm packages so we can use them.

var mysql = require("mysql");
var inquirer = require("inquirer");

//the event package is actually a pretty funny story. I was getting errors about an Event Emitter leak detected. I thought it had something to do with my for loops, but the syntax on those seemed just fine. With some googline, this package and line of code seemed to do the trick. Probably not best to set the max listeners to infinity in a real world situation, but for the purposes of our fun little app, it was very needs-suiting. 

const EventEmitter = require('events').EventEmitter.defaultMaxListeners = Infinity;


//connecting to MySQL

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,


    user: "root",

  
    password: "",
    database: "Bamazon"
});

console.log("==============================================");

console.log("Hey there, boss-man(or woman!). Welcome to the management portal. Here is the current inventory.  ");

connection.connect(function(err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId);


});

//selecting the data from our products table and running our store function. 

connection.query("SELECT * FROM products", function(err, res) {
    for (var i = 0; i < res.length; i++) {
        
    }
    console.log("-----------------------------------");
    start();

});

//store functionality

var start = function() {


//select data from our table and display product info such as the id, game, genre, price, and our current quanitity. 
    connection.query("SELECT * FROM products", function(err, res) {

        for (var i = 0; i < res.length; i++) {
        	console.log("==============================================");
        	
            console.log("ID: " + res[i].id + " |  Game: " + res[i].product_name + " |  Genre: " + res[i].department + " |  Price: " + res[i].price + " | Stock: " + res[i].stock_quantity);
            
        }

        



    })
}
       