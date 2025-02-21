const bcrypt = require('bcryptjs');
const pool = require('../db/connection');
const generateToken = require('../utils/generateToken');

exports.signup = async (req, res) => {
    try {
        const { name, email, phone_number, password } = req.body;

        // Check if all fields are provided
        if (!name || !email || !phone_number || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user already exists
        const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds); // ✅ Ensure password is defined

        // Insert user into database
        const newUser = await pool.query(
            'INSERT INTO users (name, email, phone_number, password) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, email, phone_number, hashedPassword]
        );

        // Generate JWT token
        const token = generateToken(newUser.rows[0].email);

        // Set cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (user.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.rows[0].password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT Token
        const token = generateToken(user.rows[0].email);

        // Set JWT in cookies
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({ message: 'Login successful', user: user.rows[0], token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(200).json({ message: 'Logged out successfully' });
};
exports.checkAuth=(req,res)=>{
    try{
        res.status(200).json(req.user);

    }
    catch(error){
        res.status(500).json({message:error});
    }
}