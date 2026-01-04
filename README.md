# GraphQL Blog API

A GraphQL-based blog API built with Node.js, Express, Apollo Server, and MongoDB. This project demonstrates how to create a simple blog API with GraphQL, featuring basic CRUD operations for blog posts.

## Features

- **GraphQL API** - Built with Apollo Server and Express
- **MongoDB Integration** - Persistent data storage with Mongoose
- **Type Definitions** - Strongly typed schema for better development experience
- **Environment Variables** - Secure configuration management using dotenv
- **RESTful-like CRUD Operations** - Create, Read, Update, and Delete blog posts

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas)
- Basic understanding of GraphQL

## Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd graphql-blog
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add your MongoDB connection string:
   ```
   MONGO_URI=mongodb://localhost:27017/graphql-blog
   # or for MongoDB Atlas
   # MONGO_URI=your_mongodb_atlas_connection_string
   ```

4. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

   The GraphQL Playground will be available at `http://localhost:4000/graphql`

## Project Structure

```
graphql-blog/
├── .env                    # Environment variables
├── .gitignore             # Git ignore file
├── LICENSE                # Project license
├── package.json           # Project dependencies and scripts
├── server.js              # Main application file
├── models/
│   └── Post.js            # Mongoose Post model
└── node_modules/          # Installed dependencies
```

## API Documentation

### Queries

#### Get all posts
```graphql
query {
  posts {
    id
    title
    content
  }
}
```

#### Get a single post by ID
```graphql
query {
  post(id: "post_id_here") {
    id
    title
    content
  }
}
```

### Mutations

#### Create a new post
```graphql
mutation {
  addPost(title: "New Post", content: "This is a new blog post") {
    id
    title
    content
  }
}
```

#### Delete a post
```graphql
mutation {
  deletePost(id: "post_id_here") {
    id
    title
  }
}
```

## Available Scripts

- `npm start` - Start the development server
- `npm test` - Run tests (currently not implemented)

## Dependencies

- apollo-server-express: ^3.13.0
- dotenv: ^16.4.7
- express: ^4.17.1
- graphql: ^16.10.0
- mongoose: ^8.13.1

## Development

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [GraphQL](https://graphql.org/)

## Support

For support, please open an issue in the GitHub repository.
