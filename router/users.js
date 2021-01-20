const router = require('express').Router();
const bcrypt = require('bcrypt');
var bodyParser = require('body-parser');

let User = require('../models/users.model');
const saltRounds = 10;
var jsonParser = bodyParser.json();

router.route('/').get((req, res) => {
    User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post(jsonParser, (req, res) => {
    const email = req.body.email;
    var password = req.body.password;

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    password = hash;

    const newUser = new User({ email, password });

    newUser
        .save()
        .then(() => res.json('User added!'))
        .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
