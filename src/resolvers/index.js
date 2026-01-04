const resolvers = {
  Query: {
    hello: () => {
      try {
        return 'Hello, GraphQL!';
      } catch (error) {
        throw new Error(`Error in hello resolver: ${error.message}`);
      }
    },
  },
  Mutation: {
    echo: (_, { message }) => {
      try {
        if (!message) {
          throw new Error('Message is required');
        }
        return `You said: ${message}`;
      } catch (error) {
        throw new Error(`Error in echo mutation: ${error.message}`);
      }
    },
  },
};

module.exports = resolvers;