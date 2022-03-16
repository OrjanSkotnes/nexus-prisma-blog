import { extendType, intArg, nonNull } from 'nexus'

export const userQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('user', {
      type: 'User',
      args: {
        id: nonNull(intArg()),
      },
      resolve: async (_root, { id }, ctx) => {
        return ctx.db.user.findUnique({
          where: { id },
        })
      },
    })
  },
})
