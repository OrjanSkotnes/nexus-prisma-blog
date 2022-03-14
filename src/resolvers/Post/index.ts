import { extendType, objectType } from 'nexus'
import { Post } from 'nexus-prisma'
import { PostQuery } from './queries'
import { PostMutation } from './mutations'

export const PostModel = objectType({
  name: Post.$name,
  definition(t) {
    t.field(Post.id)
    t.field(Post.title)
    t.field(Post.body)
    t.field(Post.published)
  },
})

export const resolvers = {
  PostModel,
  PostMutation,
  PostQuery,
}
