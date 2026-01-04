const { AuthenticationError, UserInputError } = require('@apollo/server');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../../config/config');
const logger = require('../../../utils/logger');

// In-memory store for demo purposes (replace with database in production)
const users = [];
let userIdCounter = 1;

const generateToken = (user) => {
  return jwt.sign(
    { userId: user.id, role: user.role },
    config.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

const userResolvers = {
  Query: {
    me: async (_, __, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not authenticated');
      }
      const user = users.find(u => u.id === context.user.id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    },
    user: async (_, { id }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not authenticated');
      }
      if (context.user.role !== 'ADMIN') {
        throw new Error('Unauthorized: Admin access required');
      }
      const user = users.find(u => u.id === id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    },
    users: async (_, __, context) => {
      if (!context.user || context.user.role !== 'ADMIN') {
        throw new Error('Unauthorized: Admin access required');
      }
      return users;
    },
  },
  Mutation: {
    register: async (_, { input }) => {
      const { username, email, password } = input;

      // Check if user already exists
      const existingUser = users.find(user => user.email === email);
      if (existingUser) {
        throw new UserInputError('Email already in use');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const newUser = {
        id: `user_${userIdCounter++}`,
        username,
        email,
        password: hashedPassword,
        role: 'USER',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      users.push(newUser);
      
      // Generate token
      const token = generateToken(newUser);
      
      return {
        token,
        user: { ...newUser, password: null }, // Don't return password
      };
    },
    login: async (_, { input }) => {
      const { email, password } = input;

      // Find user
      const user = users.find(u => u.email === email);
      if (!user) {
        throw new UserInputError('Invalid credentials');
      }

      // Verify password
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new UserInputError('Invalid credentials');
      }

      // Generate token
      const token = generateToken(user);
      
      return {
        token,
        user: { ...user, password: null }, // Don't return password
      };
    },
    updateUser: async (_, { id, input }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not authenticated');
      }
      
      // Users can only update their own profile unless they're an admin
      if (context.user.id !== id && context.user.role !== 'ADMIN') {
        throw new Error('Unauthorized');
      }

      const userIndex = users.findIndex(u => u.id === id);
      if (userIndex === -1) {
        throw new Error('User not found');
      }

      const updatedUser = {
        ...users[userIndex],
        ...input,
        updatedAt: new Date().toISOString(),
      };

      // Hash new password if provided
      if (input.password) {
        updatedUser.password = await bcrypt.hash(input.password, 10);
      }

      users[userIndex] = updatedUser;
      return { ...updatedUser, password: null };
    },
    deleteUser: async (_, { id }, context) => {
      if (!context.user || context.user.role !== 'ADMIN') {
        throw new Error('Unauthorized: Admin access required');
      }

      const userIndex = users.findIndex(u => u.id === id);
      if (userIndex === -1) {
        throw new Error('User not found');
      }

      users.splice(userIndex, 1);
      return true;
    },
  },
};

module.exports = userResolvers;
