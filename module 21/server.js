const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const { typeDefs, resolvers } = require('./schema');
const { authMiddleware } = require('./middleware/auth');

// Create an Express app
const app = express();

// Apply authentication middleware
app.use(authMiddleware);

// Create an Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Get the authenticated user from the request headers
    const user = req.user;
    return { user };
  },
});

// Apply the Apollo Server middleware to the Express app
server.applyMiddleware({ app });

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});