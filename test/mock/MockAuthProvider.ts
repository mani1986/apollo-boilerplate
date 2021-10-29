import { User } from 'models/User'
import { Injectable } from 'graphql-modules'
import { AuthenticationEntities } from 'modules/auth/providers/AuthProvider'

type MockContext = {
  mock: {
    user: User
  }
}
@Injectable({
  global: true,
})
export class MockAuthProvider {
  async extractAuthFromContext({ mock: { user } }: MockContext): Promise<AuthenticationEntities> {
    return {
      user,
    }
  }
}
