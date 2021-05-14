const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');
const randomize = require('randomatic');
const bcrypt = require('bcrypt');
const multer = require('multer');
const crypt = require('bcrypt-nodejs');
const con = require("./app/models/db.js");
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const jwt_decode = require('jwt-decode');
var path = require("path");
const socket = require('socket.io');
const Automobiliste = require("./app/models/automobiliste.model.js");

var router = express.Router();
app.use(cors());



const saltRounds = 10;
// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
	res.json({ message: "Welcome to wecamp application." });
});

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'WeAdvert.app.contact@gmail.com',
		pass: 'WeAdvert123'
	}
});

/* function sendVerificationEmail(email, idMembre)
{
	let randomCode = randomize('0', 5);
	var mailOptions = {
		from: 'wecamp.app.contact@gmail.com',
		to: email,
		subject: 'Account Verification',
		html: "<p>You can use this code to verify your account: " + randomCode + ".</p>"
	};
	transporter.sendMail(mailOptions, function(error, info){
	if (error) 
	{
		console.log(error);
	} 
	else 
	{
		console.log('Email sent: ' + info.response);
		con.query("INSERT INTO verificationcodes (idMembre, verifCode) VALUES(?, ?)", [idMembre, randomCode]);
	}
	});
} */

function sendForgotPasswordEmail(email, idAuto) {
	let randomCode = randomize('0', 5);
	var mailOptions = {
		from: 'WeAdvert.app.contact@gmail.com',
		to: email,
		subject: 'Reset your password',
		html:
		"<p>You can use this code to reset your password: " + randomCode + ".</p>"+

	'<body style="background-color: #fafafa;display: flex;justify-content: center;align-items: center;">'+
			'<style>'+

'$font-title: "Open Sans";'+

'@import url("https://fonts.googleapis.com/css?family=Open+Sans");'+

'* {box-sizing: border-box;}'+
'body {background-color: #fafafa;display: flex;justify-content: center;align-items: center;}'+
'.c-email {width: 40vw;border-radius: 40px;overflow: hidden;box-shadow: 0px 7px 22px 0px rgba(0, 0, 0, 0.1);'+
'&__header {background-color: #0fd59f;width: 100%;height: 60px;'+
    '&__title {font-size: 23px;font-family: $font-title;height: 60px;line-height: 60px;margin: 0;text-align: center;color: white;}}'+
 ' &__content {width: 100%;height: 300px;display: flex;flex-direction: column;justify-content: space-around;align-items: center;flex-wrap: wrap;background-color: #fff;padding: 15px;'+
'    &__text {font-size: 20px;text-align: center;color: #343434;margin-top: 0;}}'+
 ' &__code {display: block;width: 60%;margin: 30px auto;background-color: #ddd;border-radius: 40px;padding: 20px;text-align: center;font-size: 36px;font-family: $font-title;letter-spacing: 10px;box-shadow: 0px 7px 22px 0px rgba(0, 0, 0, 0.1);}'+
'  &__footer {width: 100%;height: 60px;background-color: #fff;}}'+

'.text-title {font-family: $font-title;}'+
'.text-center {text-align: center;}'+
'.text-italic {font-style: italic;}'+
'.opacity-30 {opacity: 0.3;}'+
'.mb-0 {margin-bottom: 0;}'+



		'</style>'+
		'<div style="width: 40vw;border-radius: 40px;overflow: hidden;box-shadow: 0px 7px 22px 0px rgba(0, 0, 0, 0.1);">' +
  '<div style="width: 40vw;border-radius: 40px;overflow: hidden;box-shadow: 0px 7px 22px 0px rgba(0, 0, 0, 0.1);background-color: #0fd59f;width: 100%;height: 60px;">'+
    '<h1 style="width: 40vw;border-radius: 40px;overflow: hidden;box-shadow: 0px 7px 22px 0px rgba(0, 0, 0, 0.1);background-color: #0fd59f;width: 100%;height: 60px;font-size: 23px;font-family: $font-title;height: 60px;line-height: 60px;margin: 0;text-align: center;color: white;">Your Verification Code</h1>'+
  '</div>'+
  '<div style="width: 40vw;border-radius: 40px;overflow: hidden;box-shadow: 0px 7px 22px 0px rgba(0, 0, 0, 0.1);width: 100%;height: 300px;display: flex;flex-direction: column;justify-content: space-around;align-items: center;flex-wrap: wrap;background-color: #fff;padding: 15px;">'+
    '<p style="width: 40vw;border-radius: 40px;overflow: hidden;box-shadow: 0px 7px 22px 0px rgba(0, 0, 0, 0.1);width: 100%;height: 300px;display: flex;flex-direction: column;justify-content: space-around;align-items: center;flex-wrap: wrap;background-color: #fff;padding: 15px;font-size: 20px;text-align: center;color: #343434;margin-top: 0;font-family: $font-title;">'+
      'Enter this verification code in field:'+
    '</p>'+
    '<div style="width: 40vw;border-radius: 40px;overflow: hidden;box-shadow: 0px 7px 22px 0px rgba(0, 0, 0, 0.1);display: block;width: 60%;margin: 30px auto;background-color: #ddd;border-radius: 40px;padding: 20px;text-align: center;font-size: 36px;font-family: $font-title;letter-spacing: 10px;box-shadow: 0px 7px 22px 0px rgba(0, 0, 0, 0.1);">'+
      '<span style="width: 40vw;border-radius: 40px;overflow: hidden;box-shadow: 0px 7px 22px 0px rgba(0, 0, 0, 0.1);display: block;width: 60%;margin: 30px auto;background-color: #ddd;border-radius: 40px;padding: 20px;text-align: center;font-size: 36px;font-family: $font-title;letter-spacing: 10px;box-shadow: 0px 7px 22px 0px rgba(0, 0, 0, 0.1);">123456</span>'+
    '</div>'+
   
  '</div>'+
  '<div style="c-email__footer"></div>'+
'</div>'+
'</body>'
	};
	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		}
		else {
			console.log('Email sent: ' + info.response);
			con.query("INSERT INTO verificationcodes (idAuto, Verifcode) VALUES(?, ?)", [idAuto, randomCode]);
		}
	});
}
function sendForgotPasswordEmailAgencies(email, idAnnonceur) {
	let randomCode = randomize('0', 5);
	var mailOptions = {
		from: 'WeAdvert.app.contact@gmail.com',
		to: email,
		subject: 'Reset your password',
		html: "<p>You can use this code to reset your password: " + randomCode + ".</p>"
	};
	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		}
		else {
			console.log('Email sent: ' + info.response);
			con.query("INSERT INTO verificationcodesann (idAnnonceur, VerifCode) VALUES(?, ?)", [idAnnonceur, randomCode]);
		}
	});
}

function sendPasswordChangedEmail(email, idAuto) {

	var mailOptions = {
		from: 'wecamp.app.contact@gmail.com',
		to: email,
		subject: 'Password Changed',
		html: "<p>Your password has been changed successfully: .</p>"
	};
	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		}
		else {
			console.log('Email sent: ' + info.response);
		}
	});
}
function sendPasswordChangedEmailAgencies(email, idAnnonceur) {

	var mailOptions = {
		from: 'wecamp.app.contact@gmail.com',
		to: email,
		subject: 'Password Changed',
		html: "<p>Your password has been changed successfully: .</p>"
	};
	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		}
		else {
			console.log('Email sent: ' + info.response);
		}
	});
}

function verifyUser(idMembre, code, cb) {
	con.query("SELECT * FROM verificationcodes WHERE idMembre = ? AND verifCode = ?", [idMembre, code],
		function (err, result) {
			if (err) throw err;
			cb(result);
		}
	);
}

function verifResetCode(idMembre, code, cb) {
	con.query("SELECT * FROM verificationcodes WHERE idMembre = ? AND verifCode = ?", [idMembre, code],
		function (err, result) {
			if (err) throw err;
			cb(result);
		}
	);
	return true;
}

// when member click on fogot my password
app.post("/forgot_password", function (req, res) {
	let email = req.body.email;
	con.query("SELECT * FROM automobiliste WHERE email = ? ", [email],
		function (err, result) {
			if (err) throw err;
			let numRows = result.length;
			console.log(result);
			if (numRows == 0) {
				res.status(401).json("Invalid Email");
			}
			else {
				sendForgotPasswordEmail(email, result[0].idAuto);
				console.log("check your email");
				res.json(result[0].idAuto);
			}
		});
});
app.post("/forgot_password_Agencies", function (req, res) {
	let email = req.body.email;
	con.query("SELECT * FROM annonceur WHERE email = ? ", [email],
		function (err, result) {
			if (err) throw err;
			let numRows = result.length;
			if (numRows = 0) {
				res.json("Invalid Email");
			}
			else {
				sendForgotPasswordEmailAgencies(email, result[0].idAnnonceur);
				console.log("check your email");
				res.json(result[0].idAnnonceur);
			}
		});
});

// used to verif the code sent
app.post("/verify_reset_code", function (req, res) {
	let email = req.body.email;
	let code = req.body.code;
	con.query("SELECT * FROM membre WHERE email = ? ", [email],
		function (err, result) {
			if (err) throw err;
			let numRows = result.length;
			if (numRows = 0) {
				res.json("Invalid Email");
			}
			else {
				var user = result[0].idMembre;
				verifResetCode(user, code, function (result) {
					let length = result.length;
					if (length == 0) {
						res.json(false);
					}
					else {
						res.json(true);
					}
				});
			}

		});

});

// when the code sent is valid
app.post("/reset_password", function (req, res) {
	let verifCode = req.body.code;
	let email = req.body.email;
	let password = req.body.password;
	con.query("SELECT * FROM automobiliste WHERE email = ? ", [email],
		function (err, resultSelect) {
			if (err) throw err;
			let numRows = resultSelect.length;
			if (numRows = 0) {
				res.json("Invalid Email");
			}
			else {
				var idAuto = resultSelect[0].idAuto;
				bcrypt.genSalt(saltRounds, function (err, salt) {
					bcrypt.hash(password, saltRounds, function (hashErr, hash) {
						con.query("UPDATE automobiliste SET password = ? WHERE idAuto = ? ", [hash, idAuto],
							function (err, result) {
								if (err) throw err;
								let numRows = result.length;
								if (numRows = 0) {
									res.json("Invalid Email");
								}
								else {
									sendPasswordChangedEmail(email, idAuto);
									con.query("DELETE FROM verificationcodes WHERE idAuto = ?", [idAuto]);
									console.log("check your email");
									res.json([idAuto]);
								}
							});
					});
				});

			}
		});

});
app.post("/reset_password_Agencies", function (req, res) {
	let verifCode = req.body.code;
	let email = req.body.email;
	let password = req.body.password;
	con.query("SELECT * FROM annonceur WHERE email = ? ", [email],
		function (err, resultSelect) {
			if (err) throw err;
			let numRows = resultSelect.length;
			if (numRows = 0) {
				res.json("Invalid Email");
			}
			else {
				var idAnnonceur = resultSelect[0].idAnnonceur;
				bcrypt.genSalt(saltRounds, function (err, salt) {
					bcrypt.hash(password, saltRounds, function (hashErr, hash) {
						con.query("UPDATE annonceur SET password = ? WHERE idAnnonceur = ? ", [hash, idAnnonceur],
							function (err, result) {
								if (err) throw err;
								let numRows = result.length;
								if (numRows = 0) {
									res.json("Invalid Email");
								}
								else {
									sendPasswordChangedEmailAgencies(email, idAnnonceur);
									con.query("DELETE FROM verificationcodesann WHERE idAnnonceur = ?", [idAnnonceur]);
									console.log("check your email");
									res.json([idAnnonceur]);
								}
							});
					});
				});

			}
		});

});

app.post("/register_user", function (req, res) {
	console.log("registering")

	let nom = req.body.nom;
	let prenom = req.body.prenom;
	let email = req.body.email;
	let password = req.body.password;
	let dateNaiss = req.body.dateNaiss;
	let cin = req.body.cin;
	let photo = req.body.photo;
	let profession = req.body.profession;
	let lieuCirculation = req.body.lieuCirculation;
	let revenu = req.body.revenu;
	let score = req.body.score;
	con.query("SELECT * FROM automobiliste WHERE email = ? ", [email],
		function (err, result) {
			if (err) throw err;
			let numRows = result.length;
			if (numRows != 0) {
				res.json("Email is already associated with an account");
			}
			else {
				bcrypt.genSalt(saltRounds, function (err, salt) {
					bcrypt.hash(password, saltRounds, function (hashErr, hash) {
						con.query("INSERT INTO automobiliste (nom, prenom, email, password,dateNaiss,cin,photo,profession,lieuCirculation,revenu,score) VALUES(?,?,?,?,?,?,?,?,?,?,?)",
							[nom, prenom, email, hash, dateNaiss, cin, photo, profession, lieuCirculation, revenu, score],
							function (err2, result2) {
								if (err2) throw err2;
								let resultId = result2.insertId;
								sendVerificationEmail(email, resultId);
								res.json(resultId);
							});
					});
				});
			}
		});
});

app.post("/register_agencies", function (req, res) {
	console.log("registering")

	let entreprise = req.body.entreprise;
	let email = req.body.email;
	let password = req.body.password;
	let photo = req.body.photo;

	con.query("SELECT * FROM annonceur WHERE email = ? ", [email],
		function (err, result) {
			if (err) throw err;
			let numRows = result.length;
			if (numRows != 0) {
				res.json("Email is already associated with an account");
			}
			else {
				bcrypt.genSalt(saltRounds, function (err, salt) {
					bcrypt.hash(password, saltRounds, function (hashErr, hash) {
						con.query("INSERT INTO annonceur (entreprise, email, password,image) VALUES(?,?,?,?)",
							[entreprise, email, hash, photo],
							function (err2, result2) {
								if (err2) throw err2;
								let resultId = result2.insertId;
								sendVerificationEmail(email, resultId);
								res.json(resultId);
							});
					});
				});
			}
		});
});

let secret = 'some_secret';
app.post('/login', function (req, res) {
	let email = req.body.email;
	let password = req.body.password;
	console.log("Trying to find " + email + " with password: " + password);
	con.query("SELECT * FROM automobiliste WHERE email = ? LIMIT 1", [email],
		function (err, result) {
			console.log("dfdfdfdfffffffffff");
			if (err) throw err;
			let numRows = result.length;
			console.log(result);
			if (numRows == 0) {
				res.status(401).json("Account not found");
			}
			else {
				bcrypt.compare(password, result[0]["password"], function (err, cmpHash) {
					if (cmpHash) {
						let token = jwt.sign({ "email": email, "password": password }, secret, { expiresIn: "15d" });
						console.log(token);
						res.status(200).send({ auth: true, token: token });
						var decoded = jwt_decode(token);
						//var com = res.status(200).json({"token": decoded.email});

						//console.log(com);



					}
					else {
						res.json("Wrong password");
					}
				});
			}
		})
});
app.post('/loginagencies', function (req, res) {
	let email = req.body.email;
	let password = req.body.password;
	const Id = req.idAnnonceur;
	console.log("Trying to find " + email + " with password: " + password);
	con.query("SELECT * FROM annonceur WHERE email = ? LIMIT 1", [email],
		function (err, result) {
			console.log("dfdfdfdfffffffffff");
			if (err) throw err;
			let numRows = result.length;
			console.log(result);
			if (numRows == 0) {
				res.json("Account not found");
			}
			else {
				bcrypt.compare(password, result[0]["password"], function (err, cmpHash) {
					if (cmpHash) {
						let token = jwt.sign({ "email": email, "password": password }, secret, { expiresIn: "15d" });
						console.log(token);
						res.status(200).send({ auth: true, token: token });
						var decoded = jwt_decode(token);
						//var com = res.status(200).json({"token": decoded.email});

						//console.log(com);



					}
					else {
						res.json("Wrong password");
					}
				});
			}
		})
});
app.get('/profil-agencies', function (req, res) {
	var token = req.headers['Authorization'] || req.headers['x-access-token']
	console.log(token);
	if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

	jwt.verify(token, secret, function (err, decoded) {
		try {
			console.trace();
		} catch (e) {
			console.log(e)
		}
		if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });


		//res.status(200).send(decoded);
		con.query("SELECT * FROM annonceur WHERE email = ?", [decoded.email],
			function (err2, result2) {
				if (err2) throw err2;
				/* let numRows = result2.length;
				console.log(result2);
				console.log("rdddddd"); */

				/* if (numRows != 0)
				{
					res.json("Email or phone are already associated with an account");
				} */
				/* else
				{ */
				res.json(result2);
				console.log(result2)
				/* } */
			});


	});
});
app.get('/stat', function (req, res) {
	var token = req.headers['Authorization'] || req.headers['x-access-token']
	console.log(token);
	if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

	jwt.verify(token, secret, function (err, decoded) {
		try {
			console.trace();
		} catch (e) {
			console.log(e)
		}
		if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });


		//res.status(200).send(decoded);
		con.query("SELECT * FROM annonceur WHERE email = ?", [decoded.email],
			function (err2, result2) {
				if (err2) throw err2;

				let hjjkbj = result2[0].idAnnonceur;
				console.log("lnknknjknjknkjnk");
				console.log(hjjkbj);
				console.log(result2);
				console.log('3asb&ahjjk', hjjkbj);
		con.query('SELECT FLOOR((MONTH(dateDeb))/3)+1 semester , COUNT(*) valeur FROM offre where idAnnonceur = ? GROUP BY FLOOR((MONTH(dateDeb))/3)', [hjjkbj], function (error, results, fields) {
		if (error) throw error;
		return res.send(results);
	});
  });
});
});
app.get('/offre', function (req, res) {
	var token = req.headers['Authorization'] || req.headers['x-access-token']
	console.log(token);
	if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

	jwt.verify(token, secret, function (err, decoded) {
		try {
			console.trace();
		} catch (e) {
			console.log(e)
		}
		if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });


		//res.status(200).send(decoded);
		con.query("SELECT * FROM annonceur WHERE email = ?", [decoded.email],
			function (err2, result2) {
				if (err2) throw err2;

				let hjjkbj = result2[0].idAnnonceur;
				console.log("lnknknjknjknkjnk");
				console.log(hjjkbj);
				console.log(result2);
				console.log('3asb&ahjjk', hjjkbj);
				setTimeout(() => {
					con.query("SELECT * FROM offre WHERE idAnnonceur = ?", [hjjkbj],
						function (err3, result3) {
							if (err3) throw err3;

							console.log("dddddddddddddddddd");
							res.json(result3);

							console.log(result3);

						});
				}, 2000)
				/* } */
			});
	});



});
app.get('/drivers-positions', function (req, res) {
	var token = req.headers['Authorization'] || req.headers['x-access-token']
	console.log(token);
	if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

	jwt.verify(token, secret, function (err, decoded) {
		try {
			console.trace();
		} catch (e) {
			console.log(e)
		}
		if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });


		//res.status(200).send(decoded);
		con.query("SELECT * FROM annonceur WHERE email = ?", [decoded.email],
			function (err2, result2) {
				if (err2) throw err2;

				let hjjkbj = result2[0].idAnnonceur;
				console.log("lnknknjknjknkjnk");
				console.log(hjjkbj);
				console.log(result2);
				console.log('3asb&ahjjk', hjjkbj);
				setTimeout(() => {
					con.query(`SELECT * FROM annonceur an, offre o, automobiliste a, revenu r, users_location ul 
					WHERE an.idAnnonceur =? AND o.idAnnonceur =? AND an.idAnnonceur = o.idAnnonceur 
					  AND o.idOffre = r.idOffre 
						AND r.idAuto = ul.idAuto AND a.idAuto = r.idAuto `, [hjjkbj,hjjkbj],
						function (err3, result3) {
							if (err3) throw err3;

							console.log("dddddddddddddddddd");
							res.json(result3);

							console.log(result3);

						});
				}, 2000)
				/* } */
			});
	});

});
app.delete('/deleteoffers/:idOffre', function (req, res) {

	var idOffre = req.params.idOffre;

	con.query("DELETE FROM offre WHERE idOffre = ?", [idOffre]);

	res.json(idOffre);
});
app.get('/countoffers', function (req, res) {
	var token = req.headers['Authorization'] || req.headers['x-access-token']
	console.log(token);
	if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

	jwt.verify(token, secret, function (err, decoded) {
		try {
			console.trace();
		} catch (e) {
			console.log(e)
		}
		if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });


		//res.status(200).send(decoded);
		con.query("SELECT * FROM annonceur WHERE email = ?", [decoded.email],
			function (err2, result2) {
				if (err2) throw err2;

				let hjjkbj = result2[0].idAnnonceur;
				console.log("lnknknjknjknkjnk");
				console.log(hjjkbj);
				console.log(result2);
				console.log('3asb&ahjjk', hjjkbj);
				setTimeout(() => {
					con.query("SELECT COUNT(*) valeur FROM offre WHERE idAnnonceur = ?", [hjjkbj],
						function (err3, result3) {
							if (err3) throw err3;

							console.log("dddddddddddddddddd");
							res.json(result3);

							console.log(result3);

						});
				}, 2000)
				/* } */
			});
	});



});
app.get('/offre-auto', function (req, res) {
	var token = req.headers['Authorization'] || req.headers['x-access-token']
	console.log(token);
	if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

	jwt.verify(token, secret, function (err, decoded) {
		try {
			console.trace();
		} catch (e) {
			console.log(e)
		}
		if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });


		//res.status(200).send(decoded);
		con.query("SELECT * FROM automobiliste WHERE email = ?", [decoded.email],
			function (err2, result2) {
				if (err2) throw err2;

				let hjjkbj = result2[0].idAuto;
				console.log("lnknknjknjknkjnk");
				console.log(hjjkbj);
				console.log(result2);
				console.log('3asb&ahjjk', hjjkbj);
				setTimeout(() => {
					con.query("SELECT c.etatValidation,o.description,c.idoffre,o.gouvernorat,o.delegation,o.cible,o.dateDeb,o.cout,a.entreprise,a.image FROM candidature c, offre o, annonceur a WHERE c.idAuto = ? AND c.idOffre = o.idOffre AND o.idAnnonceur = a.idAnnonceur", [hjjkbj],
						function (err3, result3) {
							if (err3) throw err3;

							console.log("dddddddddddddddddd");


							console.log(result3);
							res.json(result3);
							//let gggg=result3[0].idOffre;
							//console.log("ddddffgvgff",gggg);
							//   con.query("SELECT * FROM offre WHERE idOffre IN(?,?)", ['2','3'],
							//   function (err4, result4)
							//   {  
							// 	  if (err4) throw err4;

							// 		console.log("dddddddddddddddddd");
							// 		  res.json(result4);

							// 		  console.log(result4);
							// 		});

						});
				}, 2000)
				/* } */
			});
	});



});
app.post('/verified',function(req,res)
{
	var idAuto = req.body.idAuto;

	var token = req.headers['Authorization'] || req.headers['x-access-token']
	console.log(token);
	if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

	jwt.verify(token, secret, function (err, decoded) {
		try {
			console.trace();
		} catch (e) {
			console.log(e)
		}
		if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });


		//res.status(200).send(decoded);
		con.query("SELECT * FROM annonceur WHERE email = ?", [decoded.email],
			function (err2, result2) {
				if (err2) throw err2;

				let idAnnonceur = result2[0].idAnnonceur;
		
				
					
		let etatvalidation = req.body.etatvalidation;
		con.query("UPDATE candidature c, offre o SET etatValidation = 1 WHERE c.idOffre=o.idOffre AND idAnnonceur =? AND idAuto= ?", [idAnnonceur,idAuto],


						function (err3, result3) {
							if (err3) throw err3;

							console.log("dddddddddddddddddd");
							res.json(result3);

							console.log(result3);

						});
			
				/* } */
			});
	});

}




);
app.get('/liste-candidature/:idOffre', function (req, res) {
	var idOffre = req.params.idOffre;
	console.log("idoffre:",idOffre);
	var token = req.headers['Authorization'] || req.headers['x-access-token']
	console.log(token);
	if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

	jwt.verify(token, secret, function (err, decoded) {
		try {
			console.trace();
		} catch (e) {
			console.log(e)
		}
		if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });


		//res.status(200).send(decoded);
		con.query("SELECT * FROM annonceur WHERE email = ?", [decoded.email],
			function (err2, result2) {
				if (err2) throw err2;

				let hjjkbj = result2[0].idAnnonceur;
				
				
					con.query("SELECT aut.idAuto,aut.nom,aut.prenom,aut.dateNaiss,aut.profession,aut.lieuCirculation,aut.photo,aut.phone FROM candidature c, offre o,automobiliste aut WHERE o.idAnnonceur = ? AND o.idOffre = ? AND c.idOffre = ? AND c.idAuto=aut.idAuto", [hjjkbj,idOffre,idOffre],
						function (err3, result3) {
							if (err3) throw err3;

							console.log("dddddddddddddddddd");


							console.log(result3);
							res.json(result3);
						

						});
				
				/* } */
			});
	});



});

const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origins: 'http://localhost:*',
	path:'/*'
  }
});
io.on('connection',function(socket) {
	console.log('Socket: client connected');
	 socket.on("connection", function(data) {

	socket.emit('connection', data); // Updates Live Notification
	socket.broadcast.emit("connections", data);
	console.log('test',data);
    con.query("INSERT INTO `notif` (`message`,`idAuto`) VALUES ('"+data.message+"','"+data.idAuto+"')");
	
	});
	  	 socket.on("message", function(data) {

	socket.emit('message', data); // Updates Live Notification
	//socket.broadcast.emit("connections", data);
	console.log('test',data);
	socket.broadcast.emit("message", data);
    con.query("INSERT INTO `messages` (`user_from`,`user_to`,`message`,`image`,`base64`) VALUES ('"+data.user_id+"','"+data.user_to+"','"+data.message+"','"+data.image+"','"+data.base64+"')");
	
	});

  });

/* app.post('/send-notification', (req, res) => {
	
	var data={
	 message:"ddddd",
	 idAuto : 18
	}
	io.emit('notification', data); // Updates Live Notification
	con.query("INSERT INTO notif (message,idAuto) VALUES(?,?)",[data.message,data.idAuto]);

	res.send(data);
	
});
app.get('/aff-notification', (req, res) => {
	

}); */

app.get('/display-notif', function (req, res) {
		var token = req.headers['Authorization'] || req.headers['x-access-token']
		console.log(token);
		if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
	
		jwt.verify(token, secret, function (err, decoded) {
			try {
				console.trace();
			} catch (e) {
				console.log(e)
			}
			if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
	
	
			//res.status(200).send(decoded);
			con.query("SELECT * FROM automobiliste WHERE email = ?", [decoded.email],
				function (err2, result2) {
					if (err2) throw err2;
	
					let hjjkbj = result2[0].idAuto;
					console.log("lnknknjknjknkjnk");
					console.log(hjjkbj);
					console.log(result2);
					console.log('3asb&ahjjk', hjjkbj);
					setTimeout(() => {
						con.query("SELECT n.message FROM notif n WHERE n.idAuto = ?", [hjjkbj],
							function (err3, result3) {
								if (err3) throw err3;
	
								console.log("dddddddddddddddddd");
	
	
								console.log(result3);
								res.json(result3);
								//let gggg=result3[0].idOffre;
								//console.log("ddddffgvgff",gggg);
								//   con.query("SELECT * FROM offre WHERE idOffre IN(?,?)", ['2','3'],
								//   function (err4, result4)
								//   {  
								// 	  if (err4) throw err4;
	
								// 		console.log("dddddddddddddddddd");
								// 		  res.json(result4);
	
								// 		  console.log(result4);
								// 		});
	
							});
					}, 2000)
					/* } */
				});
		});
	
	
	
	});
app.get('/liste-candidature-images', function (req, res) {
	var idOffre = req.params.idOffre;
	console.log("idoffre:",idOffre);
	var token = req.headers['Authorization'] || req.headers['x-access-token']
	console.log(token);
	if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

	jwt.verify(token, secret, function (err, decoded) {
		try {
			console.trace();
		} catch (e) {
			console.log(e)
		}
		if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });


		//res.status(200).send(decoded);
		con.query("SELECT * FROM annonceur WHERE email = ?", [decoded.email],
			function (err2, result2) {
				if (err2) throw err2;

				let hjjkbj = result2[0].idAnnonceur;
				
				
					con.query("SELECT aut.photo,aut.nom,aut.prenom FROM candidature c, offre o,automobiliste aut WHERE o.idAnnonceur = ? AND c.idOffre=o.idOffre AND c.idAuto=aut.idAuto AND c.etatValidation=1", [hjjkbj],
						function (err3, result3) {
							if (err3) throw err3;

							console.log("dddddddddddddddddd");


							console.log(result3);
							res.json(result3);
						

						});
				
				/* } */
			});
	});



});
app.get('/all-drivers', function (req, res) {
	var idOffre = req.params.idOffre;
	console.log("idoffre:",idOffre);
	var token = req.headers['Authorization'] || req.headers['x-access-token']
	console.log(token);
	if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

	jwt.verify(token, secret, function (err, decoded) {
		try {
			console.trace();
		} catch (e) {
			console.log(e)
		}
		if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });


		//res.status(200).send(decoded);
		con.query("SELECT * FROM annonceur WHERE email = ?", [decoded.email],
			function (err2, result2) {
				if (err2) throw err2;

				let hjjkbj = result2[0].idAnnonceur;
				
				
					con.query("SELECT count(*) valeur FROM candidature c, offre o,automobiliste aut WHERE o.idAnnonceur = ? AND c.idOffre=o.idOffre AND c.idAuto=aut.idAuto", [hjjkbj],
						function (err3, result3) {
							if (err3) throw err3;

							console.log("dddddddddddddddddd");


							console.log(result3);
							res.json(result3);
						

						});
				
				/* } */
			});
	});



});
app.get('/profil', function (req, res) {
	var token = req.headers['Authorization'] || req.headers['x-access-token']
	console.log(token);
	if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

	jwt.verify(token, secret, function (err, decoded) {
		try {
			console.trace();
		} catch (e) {
			console.log(e)
		}
		if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });


		//res.status(200).send(decoded);
		con.query("SELECT * FROM automobiliste WHERE email = ?", [decoded.email],
			function (err2, result2) {
				if (err2) throw err2;
				/* let numRows = result2.length;
				console.log(result2);
				console.log("rdddddd"); */

				/* if (numRows != 0)
				{
					res.json("Email or phone are already associated with an account");
				} */
				/* else
				{ */
				res.json(result2);
				console.log(result2)
				/* } */
			});


	});
});


const storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  cb(null, './images');
	  var fileName;
  
	},
	filename: function (req, file, cb) {
	  fileName=file.originalname;
	  cb(null, file.originalname);
	}
  });
  
  
  const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
	  cb(null, true);
	} else {
	  cb(null, false)
	}
  };
  
  
  const upload = multer({
	storage: storage,
	limits: {
	  fileSize: 1024 * 1024 * 5
	},
	fileFilter: fileFilter
  });
  
  
  app.post("/add_image", upload.single('photo'), (req, res, next) => {
	   res.send();
	   console.log(req.file);
	}, (error, req, res, next) => {
		res.status(400).send({error: error.message})
  });
  
  app.get('/file/:fileName', function (req, res) {
	  var options = {
	  root: path.join(__dirname, 'images'),
	  dotfiles: 'deny',
	  headers: {
		'x-timestamp': Date.now(),
		'x-sent': true
	  }
	}
  
	var fileName = req.params.fileName
	res.sendFile(fileName, options, function (err) {
	  if (err) {
		//res.json("pas d'image")
	  } else {
		console.log('Sent:', fileName)
	  }
	})
  });




require("./app/routes/automobiliste.routes.js")(app);
module.exports = router;
// set port, listen for requests
http.listen(3305, () => {
	console.log("Server is running on port 3305.");

});
