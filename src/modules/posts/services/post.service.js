const ApiError = require('../../../utils/ApiError');
const httpStatus = require('http-status');

class PostService {
  constructor(Post) {
    this.Post = Post;
  }

  /**
   * Create a post
   * @param {Object} postBody
   * @returns {Promise<Post>}
   */
  async createPost(postBody) {
    if (await this.Post.isTitleTaken(postBody.title)) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Title already taken');
    }
    return this.Post.create(postBody);
  }

  /**
   * Get post by id
   * @param {ObjectId} id
   * @returns {Promise<Post>}
   */
  async getPostById(id) {
    return this.Post.findById(id).populate('author', 'name email');
  }

  /**
   * Update post by id
   * @param {ObjectId} postId
   * @param {Object} updateBody
   * @returns {Promise<Post>}
   */
  async updatePostById(postId, updateBody) {
    const post = await this.getPostById(postId);
    if (!post) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
    }
    if (updateBody.title && (await this.Post.isTitleTaken(updateBody.title, postId))) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Title already taken');
    }
    Object.assign(post, updateBody);
    await post.save();
    return post;
  }

  /**
   * Delete post by id
   * @param {ObjectId} postId
   * @returns {Promise<Post>}
   */
  async deletePostById(postId) {
    const post = await this.getPostById(postId);
    if (!post) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
    }
    await post.remove();
    return post;
  }

  /**
   * Query for posts
   * @param {Object} filter - Mongo filter
   * @param {Object} options - Query options
   * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
   * @param {number} [options.limit] - Maximum number of results per page (default = 10)
   * @param {number} [options.page] - Current page (default = 1)
   * @returns {Promise<QueryResult>}
   */
  async queryPosts(filter, options) {
    const posts = await this.Post.paginate(filter, {
      ...options,
      populate: 'author',
      select: 'name email',
    });
    return posts;
  }

  /**
   * Get posts by author
   * @param {ObjectId} userId
   * @param {Object} options - Query options
   * @returns {Promise<QueryResult>}
   */
  async getPostsByAuthor(userId, options) {
    return this.queryPosts({ author: userId }, options);
  }
}

module.exports = PostService;
