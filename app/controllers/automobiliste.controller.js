const Automobiliste = require("../models/automobiliste.model.js");


exports.create = (req, res) => {
  
};


exports.findAll = (req, res) => {
  
};


exports.findOne = (req, res) => {
  
};

exports.update = (req, res) => {
  
};


exports.delete = (req, res) => {
  
};


exports.deleteAll = (req, res) => {
  
};

exports.create = (req, res) => {
  
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Customer
    const automobiliste = new Automobiliste({
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      password: req.body.password,
      dateNaiss: req.body.dateNaiss,
      cin: req.body.cin,
      photo: req.body.photo,
      profession: req.body.profession,
      lieuCirculation :req.body.lieuCirculation,
      revenu: req.body.revenu,
      score: req.body.score,
      //verified: req.body.verified,

    });
  
 
    Automobiliste.create(automobiliste, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Membre."
        });
      else res.send(data);
    });
  };
  exports.findAll = (req, res) => {
    Automobiliste.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Membre."
        });
      else res.send(data);
    });
  };
  exports.findOne = (req, res) => {
    Automobiliste.findById(req.params.automobilisteId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found membre with id ${req.params.automobilisteId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving mmebre with idmembre " + req.params.automobilisteId
          });
        }
      } else res.send(data);
    });
  };
  exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Automobiliste.updateById(
      req.params.membreId,
      new Automobiliste(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found membre with id ${req.params.membreId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating membre with id " + req.params.membreId
            });
          }
        } else res.send(data);
      }
    );
  };
  exports.delete = (req, res) => {
    Automobiliste.remove(req.params.membreId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.membreId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Customer with id " + req.params.membreId
          });
        }
      } else res.send({ message: `membre was deleted successfully!` });
    });
  };
  exports.deleteAll = (req, res) => {
    Automobiliste.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all customers."
        });
      else res.send({ message: `All Customers were deleted successfully!` });
    });
  };