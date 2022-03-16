import { extendType, objectType } from 'nexus'
import { Post } from 'nexus-prisma'

export const PostModel = objectType({
  name: Post.$name,
  definition(t) {
    t.field(Post.id)
    t.field(Post.title)
    t.field(Post.body)
    t.field(Post.published)
    t.field(Post.author)
    t.field(Post.authorId)
  },
})

export * as PostQueries from './queries'
export * as PostMutation from './mutations'
