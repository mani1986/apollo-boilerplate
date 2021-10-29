import { Mutation } from './resolvers/Mutation'
import { createModule } from 'graphql-modules'
import { loadFilesSync } from '@graphql-tools/load-files'
import { join } from 'path'
import { AuthProvider } from './providers/AuthProvider'

export const AuthModule = createModule({
  id: 'auth',
  providers: [AuthProvider],
  typeDefs: loadFilesSync(join(__dirname, './schema/*.graphql'), { useRequire: true }),
  middlewares: {
    Query: {},
  },
  resolvers: {
    Mutation,
  },
})
