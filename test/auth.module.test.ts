import { AuthModule } from '../src/modules/auth'
import { testkit } from 'graphql-modules'
import { gql } from 'apollo-server-express'
import { UserModule } from 'modules/user'
import { CommonModule } from 'modules/common'

describe('AuthModule', () => {
  let app: any

  beforeEach(() => {
    app = testkit.testModule(AuthModule, {
      replaceExtensions: true,
      inheritTypeDefs: [CommonModule, UserModule],
      typeDefs: gql`
        type Query {
          _empty: String
        }
      `,
    })
  })
})
