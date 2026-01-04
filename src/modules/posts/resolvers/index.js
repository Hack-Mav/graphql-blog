const { getAuthUser } = require('../../../utils/graphql');

/**
 * Posts resolvers
 * @param {Object} postController - Post controller instance
 * @returns {Object} Resolvers for the Post type and related queries/mutations
 */
const postResolvers = (postController) => ({
  // Post type resolvers
  Post: {
    // Resolve author field for Post type
    author: async (parent, _, { loaders }) => {
      try {
        // Using DataLoader to batch and cache user requests
        return await loaders.user.load(parent.author);
      } catch (error) {
        throw new Error('Failed to load author');
      }
    },
    
    // Format created date
    createdAt: (parent) => parent.createdAt.toISOString(),
    
    // Format updated date
    updatedAt: (parent) => parent.updatedAt.toISOString(),
  },
  
  // Query resolvers
  Query: {
    // Get all posts with pagination (public)
    posts: async (_, { page = 1, limit = 10, filter = {} }, context) => {
      try {
        const options = {
          page: parseInt(page, 10),
          limit: Math.min(100, parseInt(limit, 10)),
          ...filter,
        };
        
        // Only return published posts for non-authenticated users
        const query = { published: true };
        
        // If user is authenticated, include their drafts
        if (context.user) {
          query.$or = [
            { published: true },
            { author: context.user.id }
          ];
        }
        
        return await postController.listPosts(query, options);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
        throw new Error('Failed to fetch posts');
      }
    },
    
    // Get a single post by ID
    post: async (_, { id }, context) => {
      try {
        const post = await postController.getPost(id);
        
        // If post is not published, check if user is the author
        if (!post.published) {
          const user = context.user;
          if (!user || user.id !== post.author.toString()) {
            throw new Error('Post not found');
          }
        }
        
        return post;
      } catch (error) {
        console.error('Failed to fetch post:', error);
        throw new Error('Failed to fetch post');
      }
    },
    
    // Get posts by author (public, but shows drafts to the author)
    postsByAuthor: async (_, { authorId, page = 1, limit = 10 }, context) => {
      try {
        const options = {
          page: parseInt(page, 10),
          limit: Math.min(100, parseInt(limit, 10)),
        };
        
        // If the requesting user is the author, show all their posts
        // Otherwise, only show published posts
        const query = { author: authorId };
        if (!context.user || context.user.id !== authorId) {
          query.published = true;
        }
        
        return await postController.listPosts(query, options);
      } catch (error) {
        console.error('Failed to fetch posts by author:', error);
        throw new Error('Failed to fetch posts by author');
      }
    },
  },
  
  // Mutation resolvers
  Mutation: {
    // Create a new post (requires authentication)
    createPost: async (_, { input }, context) => {
      // Require authentication
      const user = getAuthUser(context);
      
      try {
        return await postController.createPost(input, user);
      } catch (error) {
        console.error('Failed to create post:', error);
        throw new Error(error.message || 'Failed to create post');
      }
    },
    
    // Update an existing post (must be author or admin)
    updatePost: async (_, { id, input }, context) => {
      // Require authentication
      const user = getAuthUser(context);
      
      try {
        // First, get the post to check ownership
        const post = await postController.getPost(id);
        
        // Check if user is the author or admin
        if (user.role !== 'admin' && post.author.toString() !== user.id) {
          throw new ForbiddenError('You are not authorized to update this post');
        }
        
        return await postController.updatePost(id, input, user);
      } catch (error) {
        console.error('Failed to update post:', error);
        
        if (error instanceof ForbiddenError) {
          throw error;
        }
        
        if (error.statusCode === 404) {
          throw new Error('Post not found');
        }
        
        throw new Error('Failed to update post');
      }
    },
    
    // Delete a post (must be author or admin)
    deletePost: async (_, { id }, context) => {
      // Require authentication
      const user = getAuthUser(context);
      
      try {
        // First, get the post to check ownership
        const post = await postController.getPost(id);
        
        // Check if user is the author or admin
        if (user.role !== 'admin' && post.author.toString() !== user.id) {
          throw new ForbiddenError('You are not authorized to delete this post');
        }
        
        await postController.deletePost(id, user);
        return { success: true, message: 'Post deleted successfully' };
      } catch (error) {
        console.error('Failed to delete post:', error);
        
        if (error instanceof ForbiddenError) {
          throw error;
        }
        
        if (error.statusCode === 404) {
          throw new Error('Post not found');
        }
        
        throw new Error('Failed to delete post');
      }
    },
    
    // Publish/Unpublish a post (must be author or admin)
    togglePublishPost: async (_, { id, published }, context) => {
      // Require authentication
      const user = getAuthUser(context);
      
      try {
        // First, get the post to check ownership
        const post = await postController.getPost(id);
        
        // Check if user is the author or admin
        if (user.role !== 'admin' && post.author.toString() !== user.id) {
          throw new ForbiddenError('You are not authorized to update this post');
        }
        
        return await postController.updatePost(id, { published }, user);
      } catch (error) {
        console.error('Failed to toggle post publish status:', error);
        
        if (error instanceof ForbiddenError) {
          throw error;
        }
        
        if (error.statusCode === 404) {
          throw new Error('Post not found');
        }
        
        throw new Error('Failed to update post status');
      }
    },
  },
});

module.exports = postResolvers;
