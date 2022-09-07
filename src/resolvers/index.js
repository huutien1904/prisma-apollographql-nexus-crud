const Mutation = require('./Mutation');
const Query = require('./Query');
const Type = require('./Type');

const resolvers = [...Mutation, ...Query, ...Type];

module.exports = resolvers;
