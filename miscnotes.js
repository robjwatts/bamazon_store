/////////////////////...................................................
var bidAuction = function() {
  connection.query("SELECT * FROM products", function(err, res) {
    console.log(res);
    inquirer.prompt({
      name: "choice",
      type: "input",
      choices: function(value) {
        var choiceArray = [];
        for (var i = 0; i < res.length; i++) {
          choiceArray.push(res[i].id, res[i].product_name);
        }
        return choiceArray;
    },
    message: "Please enter the ID of the item you'd like to buy!"
    }).then(function(answer) {
      for (var i = 0; i < res.length; i++) {
        if (res[i].id === answer.choice) {
          var chosenItem = res[i];
          inquirer.prompt({
            name: "quantity",
            type: "input",
            message: "How much would you like to bid?"
          }).then(function(answer) {
            if (chosenItem.highest_bid < parseInt(answer.bid)) {
              connection.query("UPDATE auctions SET ? WHERE ?", [{
                highest_bid: answer.bid
              }, {
                id: chosenItem.id
              }], function(err, res) {
                console.log("Bid placed successfully!");
                start();
              });
            }
            else {
              console.log("Your bid was too low. Try again...");
              start();
            }
          });
        }
      }
    });
  });
};

//..........