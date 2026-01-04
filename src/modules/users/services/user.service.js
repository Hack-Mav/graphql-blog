const ApiError = require('../../../utils/ApiError');
const httpStatus = require('http-status');

class UserService {
  constructor(User) {
    this.User = User;
  }

  /**
   * Create a user
   * @param {Object} userBody
   * @returns {Promise<User>}
   */
  async createUser(userBody) {
    if (await this.User.isEmailTaken(userBody.email)) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    return this.User.create(userBody);
  }

  /**
   * Get user by id
   * @param {ObjectId} id
   * @returns {Promise<User>}
   */
  async getUserById(id) {
    return this.User.findById(id);
  }

  /**
   * Get user by email
   * @param {string} email
   * @returns {Promise<User>}
   */
  async getUserByEmail(email) {
    return this.User.findOne({ email });
  }

  /**
   * Update user by id
   * @param {ObjectId} userId
   * @param {Object} updateBody
   * @returns {Promise<User>}
   */
  async updateUserById(userId, updateBody) {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    if (updateBody.email && (await this.User.isEmailTaken(updateBody.email, userId))) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    Object.assign(user, updateBody);
    await user.save();
    return user;
  }

  /**
   * Delete user by id
   * @param {ObjectId} userId
   * @returns {Promise<User>}
   */
  async deleteUserById(userId) {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    await user.remove();
    return user;
  }

  /**
   * Query for users
   * @param {Object} filter - Mongo filter
   * @param {Object} options - Query options
   * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
   * @param {number} [options.limit] - Maximum number of results per page (default = 10)
   * @param {number} [options.page] - Current page (default = 1)
   * @returns {Promise<QueryResult>}
   */
  async queryUsers(filter, options) {
    const users = await this.User.paginate(filter, options);
    return users;
  }
}

module.exports = UserService;
