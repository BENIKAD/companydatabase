const express = require('express');
const router = express.Router();
const { Users } = require('../models'); //../models
const bcrypt = require('bcryptjs'); //bcrypt
const logincontrolller = require('../controllers/logincontroller'); //../controllers/logincontroller


// Add a new user
router.post('/add', async (req, res) => {
  const { firstName, lastName, email, address, companyId, password, role} = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await Users.create({
      firstName,
      lastName,
      email,
      address,
      companyId,
      password: hashedPassword,
      role: 'admin' 
    });

    res.status(201).send(newUser);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Login a user
router.post('/login', logincontrolller.login);


// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;
  
//     try {
//       const user = await Users.findOne({ where: { email } });
  
//       if (!user) {
//         return res.status(404).send('User not found');
//       }
  
//       // Compare the password with the hashed password
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) {
//         return res.status(400).send('Invalid credentials');
//       }
  
//       //  send a response with the user data or a JWT token 
//       res.status(200).send({ message: 'Login successful', user: user });
//     } catch (err) {
//       res.status(500).send('An error occurred during login. Please try again.');
//     }
//   });
  


// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await Users.findAll();
    res.status(200).send(users);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Get a single user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await Users.findByPk(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Update a user
router.put('/:id', async (req, res) => {
  const { name, lastName, email, address, companyId } = req.body; // Destructure the request body

  try {
    const user = await Users.findByPk(req.params.id);
    if (!user) return res.status(404).send('User not found'); 

    user.name = name;
    user.lastName = lastName;
    user.email = email;
    user.address = address;
    user.companyId = companyId;

    await user.save();
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  try {
    const user = await Users.findByPk(req.params.id);
    if (!user) return res.status(404).send('User not found');

    await user.destroy();
    res.status(200).send('User deleted');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
