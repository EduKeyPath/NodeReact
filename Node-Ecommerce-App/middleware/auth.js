const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({message: 'Access token required'});
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, customer) => {
        if(err) return res.status(403).json({message:'Invalid or expired token'});

        res.customer = customer;
        next();
    })
}

module.exports = authenticateToken;