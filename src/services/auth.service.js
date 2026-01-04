const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { AuthenticationError } = require('apollo-server-express');
const config = require('../config/config');
const logger = require('../utils/logger');

class AuthService {
  constructor(userModel) {
    this.User = userModel;
  }

  /**
   * Generate JWT token
   * @param {Object} user - User object
   * @returns {string} JWT token
   */
  generateToken(user) {
    const payload = {
      userId: user._id,
      email: user.email,
      role: user.role,
    };

    return jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRES_IN,
    });
  }

  /**
   * Verify JWT token
   * @param {string} token - JWT token
   * @returns {Object} Decoded token payload
   */
  verifyToken(token) {
    try {
      return jwt.verify(token, config.JWT_SECRET);
    } catch (error) {
      logger.error('Token verification failed:', error.message);
      throw new AuthenticationError('Invalid or expired token');
    }
  }

  /**
   * Login user with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<Object>} User and token
   */
  async login(email, password) {
    // Find user by email
    const user = await this.User.findOne({ email });
    if (!user) {
      throw new AuthenticationError('Invalid email or password');
    }

    // Check if password matches
    const isMatch = await user.isPasswordMatch(password);
    if (!isMatch) {
      throw new AuthenticationError('Invalid email or password');
    }

    // Generate token
    const token = this.generateToken(user);
    
    // Remove password from user object
    const userObject = user.toObject();
    delete userObject.password;

    return { user: userObject, token };
  }

  /**
   * Register a new user
   * @param {Object} userData - User data
   * @returns {Promise<Object>} Created user and token
   */
  async register(userData) {
    // Check if email is already taken
    if (await this.User.isEmailTaken(userData.email)) {
      throw new Error('Email already taken');
    }

    // Create user
    const user = await this.User.create(userData);
    
    // Generate token
    const token = this.generateToken(user);
    
    // Remove password from user object
    const userObject = user.toObject();
    delete userObject.password;

    return { user: userObject, token };
  }

  /**
   * Change user password
   * @param {string} userId - User ID
   * @param {string} currentPassword - Current password
   * @param {string} newPassword - New password
   * @returns {Promise<boolean>} Success status
   */
  async changePassword(userId, currentPassword, newPassword) {
    const user = await this.User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Verify current password
    if (!(await user.isPasswordMatch(currentPassword))) {
      throw new Error('Current password is incorrect');
    }

    // Update password
    user.password = newPassword;
    await user.save();
    return true;
  }
}

module.exports = AuthService;
