import _ from 'lodash'
import { User } from 'models/User'
import { MiddlewareContext } from 'graphql-modules'

export type ContextType = MiddlewareContext & {
  req: any
  user: User
  accessToken: string
  injector: any
  mock: any
}

export const getContext = async (context: GraphQLModules.GlobalContext): Promise<ContextType> => {
  return { ...context } as ContextType
}
