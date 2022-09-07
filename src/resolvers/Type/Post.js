const { objectType } = require('nexus');
const Post = objectType({
  name: 'Post',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.field('createdAt', { type: 'DateTime' });
    t.nonNull.field('updatedAt', { type: 'DateTime' });
    t.nonNull.string('title');
    t.string('content');
    t.nonNull.boolean('published');
    t.field('author', {
      type: 'User',
      resolve: (parent, _, context) => {
        return context.prisma.post
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .author();
      },
    });
  },
});

module.exports = Post;
