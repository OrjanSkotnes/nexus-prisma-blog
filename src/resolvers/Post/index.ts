import { extendType, objectType } from 'nexus'
import { Post } from 'nexus-prisma'
import { PostQuery } from './queries'
import { PostMutation } from './mutations'
import { UserModel } from '../User'
import { userQuery } from '../User/queries'
import { UserMutation } from '../User/mutations'

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

export const resolvers = {
  userQuery,
  UserMutation,
  UserModel,
  PostModel,
  PostMutation,
  PostQuery,
}
