import { createApplication } from 'graphql-modules'

import { AuthModule } from './auth'
import { CommonModule } from './common'
import { UserModule } from './user'

export const app = createApplication({
  modules: [CommonModule, AuthModule, UserModule],
})
