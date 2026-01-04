const typeDefs = require('./schema/post.graphql');
const resolvers = require('./resolvers');
const Post = require('./models/Post');
const PostService = require('./services/post.service');
const PostController = require('./controllers/post.controller');

// Initialize services
const postService = new PostService(Post);

// Initialize controllers
const postController = new PostController(postService);

module.exports = {
  typeDefs,
  resolvers: resolvers(postController),
  Post,
  postService,
  postController,
};
