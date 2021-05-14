module.exports = app => {
    const automobiliste = require("../controllers/automobiliste.controller.js");
  
    // Create a new Customer
    app.post("/automobiliste", automobiliste.create);
  
    // Retrieve all Customers
    app.get("/automobiliste", automobiliste.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/automobiliste/:automobilisteId", automobiliste.findOne);
    // Update a Customer with customerId
   // app.put("/membre/:membreId", membre.update);

    // Delete a Customer with customerId
    app.delete("/automobiliste/:automobilisteId", automobiliste.delete);

    // Create a new Customer
    app.delete("/automobiliste", automobiliste.deleteAll);
    
  };