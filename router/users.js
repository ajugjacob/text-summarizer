const router = require('express').Router();
var bodyParser = require('body-parser')
let User = require('../models/users.model');

var jsonParser = bodyParser.json()

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post(jsonParser, (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const newUser = new User({email, password});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;