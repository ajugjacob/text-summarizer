const router = require('express').Router();
const bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
let User = require('../models/users.model');

var jsonParser = bodyParser.json();

router.route('/').get((req, res) => {
    User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post(jsonParser, (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    bcrypt
        .hash(password, BCRYPT_SALT_ROUNDS)
        .then(function (hashedPassword) {
            password = hashedPassword;
        })
        .catch(function (error) {
            console.log('Error saving user: ');
            console.log(error);
        });

    const newUser = new User({ email, hashedPassword });

    newUser
        .save()
        .then(() => res.json('User added!'))
        .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
