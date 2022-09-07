const { asNexusMethod } = require('nexus');
const { DateTimeResolver } = require('graphql-scalars');

const User = require('./User');
const Post = require('./Post');
const DateTime = asNexusMethod(DateTimeResolver, 'date');

const Type = [DateTime, User, Post];

module.exports = Type;
