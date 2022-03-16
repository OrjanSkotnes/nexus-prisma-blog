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
    t.field('updateUser', {
      type: 'User',
      args: {
        id: nonNull(intArg()),
        name: nonNull(stringArg()),
      },
      async resolve(_root, { id, name }, ctx) {
        return await ctx.db.user.update({
          where: { id },
          data: { name },
        })
      },
    })
    t.field('deleteUser', {
      type: 'User',
      args: {
        id: nonNull(intArg()),
      },
      async resolve(_root, { id }, ctx) {
        return await ctx.db.user.delete({ where: { id } })
      },
    })
  },
})
