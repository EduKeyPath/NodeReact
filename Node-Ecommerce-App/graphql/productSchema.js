const {buildSchema} = require('graphql');

const productSchema = buildSchema(`
    type Product {
        id: ID!
        image: String!
        title: String!
        description: String!
        price: Float!
    }
    type Query {
        products: [Product]
    }
`);

module.exports = productSchema;