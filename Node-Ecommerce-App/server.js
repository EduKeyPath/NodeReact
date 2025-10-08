const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { graphqlHTTP } = require('express-graphql');
dotenv.config();

const authRoutes = require('./routes/authRoute');
const customerRoutes = require('./routes/customerRoute');

const productSchema = require('./graphql/productSchema');
const productResolver = require('./graphql/productResolver');

const app = express();
app.use(cors());
app.use(express.json());


// app.use(cors({
//     origin:'http://localhost:3000'
// }));
// app.use((req, res, next) => {
//     const now = new Date();
//     console.log(`[${now.toISOString()}] ${req.method} ${req.url}`);
//     next();
// });

app.use('/api/auth', authRoutes);
app.use('/api/', customerRoutes);

app.use(
    '/graphql/products',
    graphqlHTTP({
        schema: productSchema,
        rootValue: productResolver,
        graphiql: true
    })
);


app.listen(process.env.PORT, () => {
    console.log(`Listening ${process.env.PORT}`);
});