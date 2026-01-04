const httpStatus = require('http-status');
const ApiError = require('../../../utils/ApiError');

class PostController {
  constructor(postService) {
    this.postService = postService;
  }

  /**
   * Create a post
   * @param {Object} postData - Post data
   * @param {Object} user - Authenticated user
   * @returns {Promise<Object>}
   */
  async createPost(postData, user) {
    try {
      // Add author to post data
      const postWithAuthor = {
        ...postData,
        author: user._id,
      };
      return await this.postService.createPost(postWithAuthor);
    } catch (error) {
      throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
  }

  /**
   * Get post by ID
   * @param {string} postId - Post ID
   * @returns {Promise<Object>}
   */
  async getPost(postId) {
    const post = await this.postService.getPostById(postId);
    if (!post) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
    }
    return post;
  }

  /**
   * Update a post
   * @param {string} postId - Post ID
   * @param {Object} updateData - Data to update
   * @param {Object} user - Authenticated user
   * @returns {Promise<Object>}
   */
  async updatePost(postId, updateData, user) {
    const post = await this.postService.getPostById(postId);
    
    // Check if post exists
    if (!post) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
    }
    
    // Check if user is the author
    if (post.author.toString() !== user._id.toString() && user.role !== 'admin') {
      throw new ApiError(httpStatus.FORBIDDEN, 'Not authorized to update this post');
    }

    return this.postService.updatePostById(postId, updateData);
  }

  /**
   * Delete a post
   * @param {string} postId - Post ID
   * @param {Object} user - Authenticated user
   * @returns {Promise<Object>}
   */
  async deletePost(postId, user) {
    const post = await this.postService.getPostById(postId);
    
    // Check if post exists
    if (!post) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
    }
    
    // Check if user is the author or admin
    if (post.author.toString() !== user._id.toString() && user.role !== 'admin') {
      throw new ApiError(httpStatus.FORBIDDEN, 'Not authorized to delete this post');
    }

    return this.postService.deletePostById(postId);
  }

  /**
   * List all posts with pagination
   * @param {Object} filter - Filter criteria
   * @param {Object} options - Query options
   * @returns {Promise<Object>}
   */
  async listPosts(filter = {}, options = {}) {
    return this.postService.queryPosts(filter, {
      ...options,
      sortBy: options.sortBy || 'createdAt:desc',
    });
  }

  /**
   * List posts by author
   * @param {string} userId - User ID
   * @param {Object} options - Query options
   * @returns {Promise<Object>}
   */
  async listPostsByAuthor(userId, options = {}) {
    return this.postService.getPostsByAuthor(userId, {
      ...options,
      sortBy: options.sortBy || 'createdAt:desc',
    });
  }
}

module.exports = PostController;
