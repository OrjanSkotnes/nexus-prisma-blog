// src/schema.ts
import { makeSchema } from 'nexus'
import { join } from 'path'
import * as types from './resolvers/index'

export const schema = makeSchema({
  types,
  outputs: {
    typegen: join(__dirname, './generated', 'nexus-typegen.ts'),
    schema: join(__dirname, './generated', 'schema.graphql'),
  },
  contextType: {
    module: join(__dirname, 'utils', 'context.ts'),
    export: 'Context',
  },
})
