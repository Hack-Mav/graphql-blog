const typeDefs = require('./schema/user.graphql');
const resolvers = require('./resolvers');
const User = require('./models/User');
const UserService = require('./services/user.service');
const UserController = require('./controllers/user.controller');

// Initialize services
const userService = new UserService(User);

// Initialize controllers
const userController = new UserController(userService);

module.exports = {
  typeDefs,
  resolvers: resolvers(userController),
  User,
  userService,
  userController,
};
