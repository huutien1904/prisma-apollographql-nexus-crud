const { objectType } = require('nexus');
const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.string('id');
    t.string('name');
    t.nonNull.string('email');
    t.nonNull.string('street');
    t.string('deletedBy');
    t.nonNull.string('role');
    t.nonNull.list.nonNull.field('posts', {
      type: 'Post',
      resolve: (parent, _, context) => {
        return context.prisma.user
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .posts();
      },
    });
  },
});

module.exports = User;
