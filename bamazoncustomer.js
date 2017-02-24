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

console.log("Hello and welcome to Bamazon. Our storefront sells used arcade machines. ");

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
            console.log("ID: " + res[i].id + " |  Game: " + res[i].product_name + " |  Genre: " + res[i].department + " |  Price: " + res[i].price + " | Stock: " + res[i].stock_quantity);
        }
        // prompts the user and asks them to select from the list of games available.
        inquirer.prompt({
            name: "choice",
            type: "rawlist",
            choices: function(value) {
                var choiceArray = [];
                for (var i = 0; i < res.length; i++) {
                    choiceArray.push(res[i].product_name);
                }
                return choiceArray;
            },
            message: "Please select the item you'd like to purchase."
        }).then(function(answer) {
            //once theyve selected the game. a prompt to select what quantity they would like.
            for (var i = 0; i < res.length; i++) {
                if (res[i].product_name === answer.choice) {
                    var chosenItem = res[i];
                    inquirer.prompt({
                        name: "quantity",
                        type: "input",
                        message: "Great choice! Now, please enter the quantity. "
                    }).then(function(answer) {

                    	//if there are enough machines in stock, a message to the user that their purchase was successful, and the app begins again, and they can see the updated database. 
                        if (chosenItem.stock_quantity > parseInt(answer.quantity)) {
                            connection.query("UPDATE products SET ? WHERE ?", [{
                                stock_quantity: answer.quantity
                            }, {
                                id: chosenItem.id

                            }], function(err, res) {
                                console.log("Purchase Successful. Thank you!");
                                start();
                            });

                            //if there is not sufficient stock, however, the transaction will not go through and they will be notified and invited to try selecting an item again.
                        } else {
                            console.log("Sorry, we don't have the inventory for that. Try again..");
                            start();
                        }
                    });
                }
            }
        });
    });
}