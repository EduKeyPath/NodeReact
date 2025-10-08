const db = require('../db');

const productResolver = {
    products: async () => {
        const [rows] = await db.query('SELECT * FROM products');
        return rows;
    }
}

module.exports = productResolver;