const { Users } = require('../models');
let jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');//bcrypt


exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Users.findOne({ where: { email } });

        if (!user) {
            return res.status(404).send('User not found');
        }

        

        // Compare the password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(400).send('Invalid credentials');
        }

        const payload = {
            isLoggedIn: true,
        };

        const option = {
            expiresIn: "1m",
        };

        const token = jwt.sign(payload, "dGoMCF7rb2sUeB5gaj5LpMXgAzIxKw9EKdVgjo7gKEHJbtHDB1EibVsV1dw1cYOr", option);

        //  send a response with the user data or a JWT token 
        res.status(200).json({ message: 'Login successful', user: user, token });
    } catch (err) {
        res.status(500).send('An error occurred during login. Please try again.');
    }
}