import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:8080/graphql/products", // your Node GraphQL endpoint
  cache: new InMemoryCache(),
});

export default client;