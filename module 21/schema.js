const { gql } = require('apollo-server');

// Define your GraphQL schema using the GraphQL SDL (Schema Definition Language)
const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Query {
    me: User
    getUser(id: ID!): User
  }

  type Mutation {
    createUser(username: String!, email: String!): User
  }
`;

// Define your resolvers to handle GraphQL queries and mutations
const resolvers = {
  Query: {
    me: (parent, args, context) => {
      // Access the authenticated user from the context
      const user = context.user;
      return user;
    },
    getUser: (parent, args, context) => {
      // Fetch the user from the database using the provided ID
      const userId = args.id;
      // Implementation of fetching user data goes here
      // Example: return User.findById(userId);
    },
  },
  Mutation: {
    createUser: (parent, args, context) => {
      // Extract the required fields from the arguments
      const { username, email } = args;
      // Create a new user with the provided data
      const newUser = {
        id: '1', // Example user ID
        username,
        email,
      };
      // Save the new user to the database
      // Implementation of saving user data goes here
      // Example: return User.create(newUser);
      return newUser;
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};