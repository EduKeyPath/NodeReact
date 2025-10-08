const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router();


// Customer Login
router.post('/login', async (req, res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message: 'Email and password are required'});
        }
        const [rows] = await db.query(
            'SELECT id, name, email, password, status FROM customers WHERE email = ?',
            [email]
        )
        if(rows.length === 0){
            return res.status(401).json({message: 'Invalid email or password'});
        }

        const customer = rows[0];
        if(customer.status === 'I'){
            return res.status(403).json({message: 'Account inactive, please contact support'});
        }
        if(customer.status === 'D'){
            return res.status(403).json({message: 'Account deleted'});
        }

        const isMatch = await bcrypt.compare(password, customer.password);
        if(!isMatch){
            return res.status(401).json({message: 'Invalid email or password'});
        }
        const token = jwt.sign(
            {id: customer.id, email:customer.email},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        )
        res.json({
            message:'Login Successfull',
            customer: {id:customer.id, name:customer.name, email:customer.email, token:token}
        })
    }catch(err){
        res.status(500).json({error: err.message});
    }
});


// Customer Registration
router.post('/register', async(req, res) => {
    try{
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({message:'All fields are required'});
        }
        const [rows] = await db.query(
            'SELECT * FROM customers WHERE email = ?',
            [email]
        );
        if(rows.length > 0){
            return res.status(400).json({message: 'Customer already registered'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await db.query(
            'INSERT INTO customers(name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        );
        res.json({message:'Customer registered successfully'});
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

module.exports = router;