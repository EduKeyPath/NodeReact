const express = require('express');
const db = require('../db');
const authToken = require('../middleware/auth');

const router = express.Router();

// Customer List
router.get('/customers', authToken, async (req, res) => {
    try{
        const [rows] = await db.query('SELECT id, name, email, status FROM customers');
        res.json(rows);
    }catch(err){
        res.status(500).json({error: err.message});
    }
});


// Status update Customer
router.patch('/customer/:id/status', authToken, async(req, res) => {
    try{
        const {id} = req.params;
        const {status} = req.body;

        if(!['A', 'I', 'D'].includes(status)){
            return res.status(400).json({message: 'Invalid status value'});
        };

        const [result] = await db.query(
            'UPDATE customers SET status = ? WHERE id = ?',
            [status, id]
        );

        if(result.affectedRows === 0){
            return res.json(404).json({message: 'Customer not found'});
        }

        res.json({message: 'Status updated successfully'});
    }catch(err){
        res.status(500).json({error: err.message});
    }
});


// Update Customer
router.patch('/customer/:id/name', authToken, async (req, res) => {
    try{
        const {id} = req.params;
        const {name} = req.body;

        const [result] = await db.query(
            'UPDATE customers SET name = ? WHERE id = ?',
            [name, id]
        )
        if(result.affectedRows === 0){
            return res.status(404).json({message: 'Customer not found'});
        }
        res.json({message: 'Customer update successfully'});
    }catch(err){
        res.status(500).json({error: err.message});
    }
})


// Delete Customer
router.delete('/customer-delete/:id', authToken, async(req, res) => {
    try{
        const {id} = req.params;
        const [result] = await db.query(
            'DELETE FROM customers WHERE id = ?', 
            [id]
        );
        if(result.affectedRows === 0){
            return res.status(404).json({message: 'Customer not found'});
        }
        res.json({message: 'Customer deleted successfully'});
    }catch(err){
        res.status(500).json({error: err.message});
    }
})

module.exports = router;