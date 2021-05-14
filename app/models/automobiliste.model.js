const sql = require("./db.js");

// constructor
const Automobiliste = function(automobiliste) {
  this.nom = automobiliste.nom;
  this.prenom = automobiliste.prenom;
  this.email = automobiliste.email;
  this.password = automobiliste.password;
  this.dateNaiss = automobiliste.dateNaiss;
  this.cin = automobiliste.cin;
  this.photo = automobiliste.photo;
  this.profession = automobiliste.profession;
  this.lieuCirculation = automobiliste.lieuCirculation;
  this.revenu = automobiliste.revenu;
  this.score = automobiliste.score;
  //this.verified = membre.verified;
 
};

Automobiliste.create = (newAutomobiliste, result) => {
  sql.query("INSERT INTO automobiliste SET ?", newAutomobiliste, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Automobiliste: ", { id: res.insertIdAutomobiliste, ...newAutomobiliste });
    result(null, { id: res.insertIdAutomobiliste, ...newAutomobiliste });
  });
};

Automobiliste.findById = (automobilisteId, result) => {
  sql.query(`SELECT * FROM automobiliste WHERE idAuto = ${automobilisteId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Automobiliste: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Automobiliste.getAll = result => {
  sql.query("SELECT * FROM automobiliste", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Automobiliste: ", res);
    result(null, res);
  });
};
Automobiliste.updateById = (idAutomobiliste, automobiliste, result) => {
  sql.query(
    "UPDATE automobiliste SET nom = ?, prenom = ?, dateNaissance = ?, numTel = ?, adresse = ?, email = ?, password = ?, photo = ?, role = ?, score = ?, verified = ? WHERE idMembre = ?",
    [membre.nom, membre.prenom, membre.dateNaissance, membre.numTel, membre.adresse, membre.email,membre.password,membre.photo,membre.role,membre.score,membre.verified, idMembre],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
       
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated membre: ", { idMembre: idMembre, ...membre });
      result(null, { idMembre: idMembre, ...membre });
    }
  );
};

Automobiliste.remove = (id, result) => {
  sql.query("DELETE FROM automobiliste WHERE idAuto = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Automobiliste with id: ", id);
    result(null, res);
  });
};

Automobiliste.removeAll = result => {
  sql.query("DELETE FROM automobiliste", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} automobiliste`);
    result(null, res);
  });
};

module.exports = Automobiliste;