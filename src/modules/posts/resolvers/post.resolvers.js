const { AuthenticationError, UserInputError } = require('@apollo/server');

// In-memory store for demo purposes (replace with database in production)
const posts = [];
let postIdCounter = 1;

const postResolvers = {
  Query: {
    posts: (_, { published = null }) => {
      if (published !== null) {
        return posts.filter(post => post.published === published);
      }
      return posts;
    },
    post: (_, { id }) => {
      const post = posts.find(p => p.id === id);
      if (!post) {
        throw new Error('Post not found');
      }
      return post;
    },
    postsByUser: (_, { userId }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not authenticated');
      }
      // Users can only see their own unpublished posts
      if (context.user.id !== userId && context.user.role !== 'ADMIN') {
        return posts.filter(p => p.authorId === userId && p.published);
      }
      return posts.filter(p => p.authorId === userId);
    },
  },
  Mutation: {
    createPost: async (_, { input }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not authenticated');
      }

      const { title, content, published = false } = input;
      
      const newPost = {
        id: `post_${postIdCounter++}`,
        title,
        content,
        published,
        authorId: context.user.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      posts.push(newPost);
      return newPost;
    },
    updatePost: async (_, { id, input }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not authenticated');
      }

      const postIndex = posts.findIndex(p => p.id === id);
      if (postIndex === -1) {
        throw new Error('Post not found');
      }

      // Users can only update their own posts unless they're an admin
      if (posts[postIndex].authorId !== context.user.id && context.user.role !== 'ADMIN') {
        throw new Error('Unauthorized: You can only update your own posts');
      }

      const updatedPost = {
        ...posts[postIndex],
        ...input,
        updatedAt: new Date().toISOString(),
      };

      posts[postIndex] = updatedPost;
      return updatedPost;
    },
    deletePost: async (_, { id }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not authenticated');
      }

      const postIndex = posts.findIndex(p => p.id === id);
      if (postIndex === -1) {
        throw new Error('Post not found');
      }

      // Users can only delete their own posts unless they're an admin
      if (posts[postIndex].authorId !== context.user.id && context.user.role !== 'ADMIN') {
        throw new Error('Unauthorized: You can only delete your own posts');
      }

      posts.splice(postIndex, 1);
      return true;
    },
  },
  // Resolve the author field for Post type
  Post: {
    author: (post) => {
      // In a real app, you would fetch the user from the database
      // This is just a mock implementation
      return { 
        id: post.authorId, 
        username: 'demo_user',
        email: 'user@example.com',
        role: 'USER',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    },
  },
};

module.exports = postResolvers;
