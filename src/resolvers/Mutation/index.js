const { objectType, stringArg, nonNull,intArg } = require("nexus");
var jwt = require("jsonwebtoken");


const createToken = (payload) => {
  return jwt.sign(
    payload,
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '5m'
    }
  )
}

const signupUserResolver = async(_,args,context) => {

  const {email, password} = args
  
  try {
    const user = await context.prisma.user.findUnique({
      where :{
        email
      }
    })
    
    if(user) return new Error("USER_EXISTS")
    await context.prisma.user.create({
      data: { email, password},
    });
    const accessToken = createToken({email,password})
    return accessToken
  } catch (error) {
    console.log(error);
  }
  
  
}
const createPostResolver = async (_,args,context) => {
  const { title, content, published } = args;
  const authorId = context.user?.id;
  if (!authorId) {
    return new Error('NOT AUTH');
  }
  try {
    const post = await context.prisma.post.create({
      data: {
        title,
        content: content || '',
        published: published || false,
        authorId,
      },
    });
    return post;
  } catch (error) {
    console.log(error);
  }
  
}
const prismaMutation = objectType({
  name: "Mutation",
  definition(t) {
    t.nonNull.field("signupUser", {
      type: "String",
      args: {
        email: nonNull(stringArg()),
        name: stringArg(),
        password: nonNull(stringArg()),
      },
      resolve: signupUserResolver
    });

    t.field("createPost", {
      type: "Post",
      args: {
        title: nonNull(stringArg()),
        content: stringArg(),
        
      },
      resolve: createPostResolver
    });

    t.field("deletePost", {
      type: "Post",
      args: {
        id: nonNull(stringArg()),
      },
      resolve: (_, args, context) => {
        return context.prisma.post.delete({
          where: { id: args.id },
        });
      },
    });
  },
});
const Mutation = [prismaMutation];

module.exports = Mutation;
