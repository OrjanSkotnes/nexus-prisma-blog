import { extendType, intArg, nonNull, stringArg } from 'nexus'

export const PostMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createDraft', {
      type: 'Post',
      args: {
        title: nonNull(stringArg()),
        body: nonNull(stringArg()),
        authorId: nonNull(intArg()),
      },
      async resolve(_root, { title, body, authorId }, ctx) {
        const draft = {
          title,
          body,
          authorId,
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
    t.field('unpublish', {
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
            published: false,
          },
        })
      },
    })
    t.field('updateDraft', {
      type: 'Post',
      args: {
        id: nonNull(intArg()),
        title: nonNull(stringArg()),
        body: nonNull(stringArg()),
      },
      async resolve(_root, { id, title, body }, ctx) {
        return await ctx.db.post.update({
          where: { id },
          data: { title, body },
        })
      },
    }),
      t.field('deletePost', {
        type: 'Post',
        args: {
          id: nonNull(intArg()),
        },
        async resolve(_root, { id }, ctx) {
          return await ctx.db.post.delete({ where: { id } })
        },
      })
  },
})
