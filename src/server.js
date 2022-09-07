const { ApolloServer } = require('apollo-server');
const schema = require('./schema');
const context = require('./context.js');

const server = new ApolloServer({
  schema: schema,
  context: context,
});

server.listen().then(async ({ url }) => {
  console.log(`🚀 Server ready at: ${url}⭐️`);
});
