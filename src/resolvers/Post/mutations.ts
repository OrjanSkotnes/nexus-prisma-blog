import { extendType, intArg, nonNull, stringArg } from 'nexus'

export const PostMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createDraft', {
      type: 'Post',
      args: {
        title: nonNull(stringArg()),
        body: nonNull(stringArg()),
      },
      async resolve(_root, { title, body }, ctx) {
        const draft = {
          title,
          body,
          published: false,
        }
        return await ctx.db.post.create({ data: draft })
      },
    })

    t.field('publish', {
      type: 'Post',
      args: {
        draftId: nonNull(intArg()),
      },
      async resolve(_root, args, ctx) {
        return await ctx.db.post.update({
          where: {
            id: args.draftId,
          },
          data: {
            published: true,
          },
        })
      },
    })
  },
})
