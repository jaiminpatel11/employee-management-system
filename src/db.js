const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const resolvers = require("./graphql/resolvers.js");
const typeDefs = require("./graphql/schema.js");
const mongoose = require('mongoose');
const MONGO_URI = "mongodb+srv://jackypatel9092:jack0848patel@cluster0.vs8y4nd.mongodb.net/EmployeePortal";

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1); 
});

// Initialize Express app
const app = express();

// Create an ApolloServer instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start ApolloServer
async function startApolloServer() {
  await server.start();
  server.applyMiddleware({ app });
}

// Start the server
const PORT = process.env.PORT || 4000;
startApolloServer().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
