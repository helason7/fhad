require('dotenv').config();

const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');

//retrieve and return all users from the database

exports.findAll = (req, res) => {

	User.find()
		.then(users => {

			res.send(users);

		}).catch(err => {

			res.status(500).send({

				message: err.message || "Something wrong while getting list of users"
			
			});

		});

};

//create and save a new user

exports.create = (req, res) => {

	//validate request
	if(!req.body){

		return res.status(400).send({

			message: "Please fill all required field"

		});
	}

	//crete a new user

	const user = new User({

		id: req.body.id,
		user_name: req.body.user_name,
		account_number: req.body.account_number,
		email_address: req.body.email_address,
		identity_number: req.body.identity_number
	});

	//save user in the database

	user.save()

		.then(data => {

			res.send(data);

		}).catch(err => {

			res.status(500).send({

				message: err.message || "Someting wrong when creating user"

			});
		});
};

// find a single user with id

exports.findOne = (req, res) => {

	User.findById(req.params.id)

		.then(user => {
			if(!user){

				return status(404).send({

					message: "User not found with id (1) " + req.params.id

				});
			}

			res.send(user);

		}).catch(err => {

			if(err.kind === 'ObjectId') {

				return res.status(404).send({

					message: "User not found with id (2) " + req.params.id

				});

			}

			return res.status(500).send({

				message: "Error getting user with id " + req.params.id

			});

		});

};

// find a single user with 

exports.findOneByUsername = (req, res) => {
	User.findOne({user_name: req.user.name})

		.then(user => {
			if(!user){

				return status(404).send({

					message: "User not found user " + req.user.name

				});
			}

			res.send(user);

		}).catch(err => {

			if(err.kind === 'undefined') {

				return res.status(404).send({

					message: "User not found user " + req.user.name

				});

			}

			return res.status(500).send({

				message: "Error getting user  " + req.user.name

			});

		});

};

// find a single user with 

exports.findUserByNumber = (req, res) => {

	User.findOne({$or: [{account_number : req.user.number}, {identity_number : req.user.number}] })

		.then(user => {
			if(!user){

				return status(404).send({

					message: "User not found " + req.user.number

				});
			}

			res.send(user);

		}).catch(err => {

			if(err.kind === 'ObjectId') {

				return res.status(404).send({

					message: "User not found number " + req.user.number

				});

			}

			return res.status(500).send({

				message: "Error getting id  " + req.user.number

			});

		});

};

//update user identify by the id in the request

exports.update = (req, res) => {

	// vaidate request

	if(!req.body) {

		return res.status(400).send({

			message: "Please fill all required fill"

		});

	}

	// find user and update it with request

	User.findByIdAndUpdate(req.params.id, {

		id: req.body.id,
		user_name: req.body.user_name,
		account_number: req.body.account_number,
		email_address: req.body.email_address,
		identity_number: req.body.identity_number
	
	}, {new: true})

	.then(user => {

		if(!user) {

			return res.status(404).send({

				message: "user not founf with id " + req.params.id

			});

		}

		res.send(user);

	}).catch(err => {

		if(err.kind === 'ObjectId'){

			return res.status(404).send({

				message: "user not dound with id " + req.params.id

			});

		}
		return res.status(500).send({

			message: "Error updating user with id " + req.params.id

		});

	});

};

// delete user with the specified id in the request


exports.delete = (req, res) => {

	// find user and update it with request

	User.findByIdAndRemove(req.params.id)

	.then(user => {

		if(!user) {

			return res.status(404).send({

				message: "user not founf with id " + req.params.id

			});

		}

		res.send({message: "user deleted successfully!"});

	}).catch(err => {

		if(err.kind === 'ObjectId' || err.name === 'NotFound'){

			return res.status(404).send({

				message: "user not dound with id " + req.params.id

			});

		}
		return res.status(500).send({

			message: "Could not delete user with id " + req.params.id

		});

	});

};

exports.login = (req, res) => {
	const number = req.body.number;
	const user = { number: number };

	const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
	res.json({ accessToken: accessToken})

}