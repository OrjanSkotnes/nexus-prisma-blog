import { extendType, intArg, nonNull, stringArg } from 'nexus'

export const UserMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createUser', {
      type: 'User',
      args: {
        name: nonNull(stringArg()),
      },
      async resolve(_root, { name }, ctx) {
        return await ctx.db.user.create({ data: { name } })
      },
    })
  },
})
