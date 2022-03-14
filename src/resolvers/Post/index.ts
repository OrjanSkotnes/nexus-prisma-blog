import { extendType, objectType } from 'nexus'
//import { Post } from 'nexus-prisma'
import { PostQuery } from './queries'
import { PostMutation } from './mutations'

export const PostModel = objectType({
  name: 'Post',
  definition(t) {
    t.int('id')
    t.string('title')
    t.string('body')
    t.boolean('published')
  },
})

export const resolvers = {
  PostModel,
  PostMutation,
  PostQuery,
}
