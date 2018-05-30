var mysql = require("mysql");


var inquirer = require("inquirer");


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  database: "bamazon"
});


connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  displayProducts();
});


function displayProducts() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) console.log(err);
    for (var i = 0; i < res.length; i++) {
      console.log(`
            Product: ${res[i].product_name}
            id: ${res[i].item_id} 
            price: $ ${res[i].price}
            stock: ${res[i].stock_quantity}
            ***********************
        `);
    }
    purchaseProduct()
  });
};


function purchaseProduct() {
  inquirer
    .prompt([{
        message: "Choose the id of the product you would like to purchase.",
        name: "item",
        type: "input",
      },
      {
        message: "How many would you like to purchase?",
        name: "quantity",
        type: "input"
      }
    ])
    .then(function (answers) {
      var quantityChosen = answers.quantity;
      var ID = answers.item;
     
      databasePurchase(ID, quantityChosen);
      console.log(ID)
    });
};


function databasePurchase(ID, quantityRequested) {
  console.log(ID, quantityRequested)
  connection.query('SELECT * FROM Products WHERE item_id = ' + ID, function (err, res) {

    console.log(res)
    if (quantityRequested <= res[0].stock_quantity) {

      var totalPrice = res[0].price * quantityRequested;

      console.log("You have purchased  " + quantityRequested + " " + res[0].product_name + "(s) for a total of $" + totalPrice)

      connection.query(
        'UPDATE products SET stock_quantity = stock_quantity - ' + quantityRequested + ' WHERE item_id = ' + ID
      );
    } else {
      console.log("Insufficien quantity!")
    }
    displayProducts();
  })
}