const bcrypt = require('bcryptjs');
const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');

const router = express.Router();

// auth middleware
const auth = require('../../middleware/auth');

// User Model
const User = require('../../models/user');

// @route   POST api/users/register
// @desc    Register new User
// @access  Public
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  /*Check All Fields */
  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  /*Password must contain a number*/
  if (!/\d/.test(password)) {
    return res.status(400).json({ msg: 'Password must contain a number' });
  }

  // Check for existing user
  User.findOne({ email }).then(user => {
    if (user)
      return res
        .status(400)
        .json({ msg: 'User already exists. Use another email' });

    const newUser = new User({ name, email, password });

    // Create Salt & Hash
    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;

      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;

        // Save user to DB
        newUser.password = hash;
        newUser
          .save()
          .then(user => {
            // Send response with token
            jwt.sign(
              { id: user.id },
              config.get('JWT_SECRET'),
              { expiresIn: 60 * 60 * 24 },
              (err, token) => {
                if (err) throw err;

                res.json({
                  token,
                  user: {
                    name: user.name,
                    email: user.email,
                    id: user.id,
                    entries: user.entries,
                  },
                });
              }
            );
          })
          .catch(err => res.status(500).json({ msg: err.message }));
      });
    });
  });
});

// @route   POST api/users/signin
// @desc    Signin existing User
// @access  Public
router.post('/signin', (req, res) => {
  const { email, password } = req.body;

  // Validation
  /*Check All Fields */
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // Check for existing user
  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).json({ msg: 'User does not exist' });

    // Validate password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      // Send response with token
      jwt.sign(
        { id: user.id },
        config.get('JWT_SECRET'),
        { expiresIn: 60 * 60 * 24 },
        (err, token) => {
          if (err) throw err;

          res.json({
            token,
            user: {
              name: user.name,
              email: user.email,
              id: user.id,
              entries: user.entries,
            },
          });
        }
      );
    });
  });
});

// @route   GET api/users/profile
// @desc    Get User data
// @access  Private
router.get('/profile', auth, (req, res) => {
  const { id } = req.user;
  User.findById(id)
    .select('-password')
    .then(user => res.json(user))
    .catch(err => console.error(err));
});

// @route   PATCH api/users/profile
// @desc    Increment entries
// @access  Private
router.patch('/profile', auth, (req, res) => {
  const { id } = req.user;
  User.findByIdAndUpdate(id, { $inc: { entries: 1 } })
    .select('-password')
    .then(user => {
      res.send(user);
    })
    .catch(err => console.error(err));
});

module.exports = router;
