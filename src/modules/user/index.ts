import { UserProvider } from './providers/UserProvider'
import AuthMiddleware from 'middleware/AuthMiddleware'
import { Query } from './resolvers/Query'
import { Mutation } from './resolvers/Mutation'
import { UserResponse } from './resolvers/Response'
import { loadFilesSync } from '@graphql-tools/load-files'
import { createModule } from 'graphql-modules'
import { join } from 'path'

export const UserModule = createModule({
  id: 'user',
  dirname: __dirname,
  providers: [UserProvider],
  middlewares: {
    Query: {
      getStatus: [AuthMiddleware.isAuthenticated],
    },
    Mutation: {
      updateUser: [AuthMiddleware.isAuthenticated],
    },
  },
  typeDefs: loadFilesSync(join(__dirname, './schema/*.graphql'), { useRequire: true }),
  resolvers: {
    Query,
    Mutation,
    UserResponse,
  },
})
