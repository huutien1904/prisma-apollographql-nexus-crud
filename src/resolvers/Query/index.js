const {
  intArg,
  nonNull,
  objectType,
  stringArg,
  arg,
  queryField,
} = require("nexus");
var jwt = require('jsonwebtoken');
const prismaqQuery = objectType({
  name: "Query",
  definition(t) {
    t.field("login", {
      type: "String",
      args: {
        email: stringArg(),
        password: stringArg(),
      },
      resolve: (_parent, {email,password}, context) => {
        console.log(context.connection);
        const accessToken = jwt.sign(
          { email , password },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "5m",
          }
        );
        return accessToken;
      },
    }),
      t.nonNull.list.nonNull.field("allUsers", {
        type: "User",
        resolve: (_parent, _args, context) => {
          return context.prisma.user.findMany();
        },
      }),
      t.nonNull.list.nonNull.field("allPosts", {
        type: "Post",
        resolve: (_parent, _args, context) => {
          return context.prisma.post.findMany();
        },
      });
  },
});
const Query = [prismaqQuery];

module.exports = Query;
