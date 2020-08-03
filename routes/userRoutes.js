const express = require('express');
const userRoutes = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
// Load input validation
const validateInput = require('../validation/userAuth');
const jwt = require('jsonwebtoken');
const keys = require('../config/key');

userRoutes.post('/signup', (req, res) => {
  // Form validation
  const { error, isValid } = validateInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(error);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).send('Email already exists');
    } else {
      const newUser = new User({
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.hash(newUser.password, 10, (err, hash) => { // myPlaintextPassword, saltRounds, function(err, hash){} -->  The higher the 'cost factor', the more hashing rounds
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
      });
    }
  })
  .catch((err) => {
    console.log(err);
    res.status(400).send('signup failed');
  });
});

userRoutes.post('/login', (req, res) => {
  // Form validation
  const { error, isValid } = validateInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).send(error);
  }
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).send('Email not found');
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => { // compare the password entered by the user on the frontend with the password stored in the data base
      if (isMatch) {
        // User matched

        //the header is jwt, which is already specified

        // Create JWT Payload
        const payload = {
          id: user.id,
          email: user.email
        };

        // Sign token, signiture
        // To create the signature part you have to take the encoded header, 'the encoded payload', a 'secret', the algorithm specified in the header, and sign that.
        jwt.sign(
          payload,
          keys.secretOrKey, // secretOrKey is a string or buffer containing the secret (symmetric) or PEM-encoded public key (asymmetric) for verifying the token's signature. REQUIRED unless secretOrKeyProvider is provided.
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            if (err) {
              return res.status(400).send('Email or Password incorrect');
            } else {
              res.json({
                success: true,
                token: 'Bearer ' + token // the token is consisted of header, payload, and signiture --> https://jwt.io/introduction/
              });
            }
          }
        );
      } else {
        return res.status(400).send('Email or Password incorrect');
      }
    });
  });
});

module.exports = userRoutes;
