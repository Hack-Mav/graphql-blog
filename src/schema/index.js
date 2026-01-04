const { ApolloServer } = require('@apollo/server');

const typeDefs = `#graphql
  type Query {
    hello: String
  }

  type Mutation {
    echo(message: String!): String
  }
`;

module.exports = typeDefs;