const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const mongoose = require("mongoose");
require("dotenv").config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Error:", err));

const Post = require("./models/Post");

const app = express();

// Saample in-memory data 
let posts = [
    { id: "1", title: "GraphQL Basics", content: "Introduction to GraphQL" },
    { id: "2", title: "Advanced GraphQL", content: "Deep dive into Apollo Server" },
];

// Define GraphQL Schema
const typeDefs = gql`
    type Post {
        id: ID!
        title: String!
        content: String!
    }

    type Query {
        posts: [Post]
        post(id: ID!): Post
    }

    type Mutation {
        addPost(title: String!, content: String!): Post
        deletePost(id: ID!): String
    }
`;

// Define Resolvers
const resolvers = {
    Query: {
        posts: async () => await Post.find(),
        post: async (_, { id }) => await Post.findById(id),
    },
    Mutation: {
        addPost: async (_, { title, content }) => {
            const newPost = new Post({ title, content });
            await newPost.save();
            return newPost;
        },
        deletePost: async (_, { id }) => {
            await Post.findByIdAndDelete(id);
            return `Post with ID ${id} deleted`;
        },
    },
};

// Setup Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });
server.start().then(() => {
    server.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log("🚀 Server running at http://localhost:4000/graphql");
    });
});